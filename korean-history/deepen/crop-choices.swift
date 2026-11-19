// swift korean-history/deepen/crop-choices.swift --detect | --crop
import Foundation
import AppKit
import PDFKit
import Vision

let root = URL(fileURLWithPath: #filePath).deletingLastPathComponent()
let assets = root.appendingPathComponent("assets")
let output = assets.appendingPathComponent("choices")
try FileManager.default.createDirectory(at: output, withIntermediateDirectories: true)

struct Raster {
    let image: CGImage
    let width: Int
    let height: Int
    var pixels: [UInt8]
    init(_ url: URL) {
        let source = CGImageSourceCreateWithURL(url as CFURL, nil)!
        image = CGImageSourceCreateImageAtIndex(source, 0, nil)!
        width = image.width; height = image.height
        pixels = [UInt8](repeating: 255, count: width * height * 4)
        pixels.withUnsafeMutableBytes { bytes in
            let context = CGContext(data: bytes.baseAddress, width: width, height: height, bitsPerComponent: 8, bytesPerRow: width * 4, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
            context.draw(image, in: CGRect(x: 0, y: 0, width: width, height: height))
        }
    }
    func dark(_ x: Int, _ y: Int) -> Bool {
        let i = (y * width + x) * 4
        return Int(pixels[i]) + Int(pixels[i + 1]) + Int(pixels[i + 2]) < 660
    }
    func vector(_ b: [Int]) -> [Double] {
        (0..<400).map { i in
            let x = min(b[2], b[0] + Int(Double(i % 20) / 19 * Double(b[2] - b[0])))
            let y = min(b[3], b[1] + Int(Double(i / 20) / 19 * Double(b[3] - b[1])))
            return dark(x, y) ? 1 : 0
        }
    }
    func rings() -> [[Int]] {
        var seen = [Bool](repeating: false, count: width * height)
        var result: [[Int]] = []
        for y in Int(Double(height) * 0.075)..<Int(Double(height) * 0.94) {
            for x in 50..<(width - 50) {
                let start = y * width + x
                if seen[start] || !dark(x, y) { continue }
                seen[start] = true
                var queue = [start], cursor = 0
                var left = x, right = x, top = y, bottom = y
                while cursor < queue.count {
                    let p = queue[cursor]; cursor += 1
                    let px = p % width, py = p / width
                    left = min(left, px); right = max(right, px); top = min(top, py); bottom = max(bottom, py)
                    for n in [p - 1, p + 1, p - width, p + width, p - width - 1, p - width + 1, p + width - 1, p + width + 1] where n >= 0 && n < seen.count && !seen[n] {
                        seen[n] = true
                        if dark(n % width, n / width) { queue.append(n) }
                    }
                }
                let w = right - left + 1, h = bottom - top + 1
                if w >= 8 && w <= 26 && h >= 9 && h <= 28 && Double(w) / Double(h) > 0.65 && Double(w) / Double(h) < 1.25 && queue.count > 20 {
                    result.append([left, top, right, bottom])
                }
            }
        }
        return result
    }
}

if CommandLine.arguments.contains("--detect") {
    let reference = Raster(assets.appendingPathComponent("80-1.jpg"))
    let rings = reference.rings()
    // Five visually verified, clean source labels on question 80-1.
    let targetY = [877, 910, 944, 977, 1010]
    let templates = targetY.map { y in
        reference.vector(rings.min { a, b in
            abs(a[0] - 89) + abs(a[1] - (y - 8)) < abs(b[0] - 89) + abs(b[1] - (y - 8))
        }!)
    }
    var pages: [String: [[String: Any]]] = [:]
    for round in 60...80 {
        for page in 1...12 {
            let name = "\(round)-\(page).jpg"
            let raster = Raster(assets.appendingPathComponent(name))
            pages[name] = raster.rings().compactMap { box in
                let v = raster.vector(box)
                let scores = templates.map { t in zip(v, t).reduce(0.0) { $0 + abs($1.0 - $1.1) } / 400 }
                let best = scores.enumerated().min { $0.element < $1.element }!
                guard best.element < 0.34 else { return nil }
                return ["box": box, "label": best.offset + 1, "score": best.element, "scores": scores]
            }
        }
        print("Detected \(round)"); fflush(stdout)
    }
    try JSONSerialization.data(withJSONObject: pages, options: [.sortedKeys]).write(to: output.appendingPathComponent("labels.json"))
} else if CommandLine.arguments.contains("--columns") {
    var columns: [String: [Int]] = [:]
    for round in 60...80 {
        for page in 1...12 {
            let name = "\(round)-\(page).jpg", r = Raster(assets.appendingPathComponent(name))
            let start = Int(Double(r.width) * 0.47), end = Int(Double(r.width) * 0.53)
            let ys = Array(stride(from: Int(Double(r.height) * 0.17), to: Int(Double(r.height) * 0.9), by: 3))
            let counts = (start...end).map { x in ys.reduce(0) { $0 + (r.dark(x, $1) ? 1 : 0) } }
            let best = counts.enumerated().max { $0.element < $1.element }!
            precondition(best.element > ys.count / 2, "Missing printed column divider: \(name)")
            var left = best.offset, right = best.offset
            while left > 0 && counts[left - 1] > best.element * 7 / 10 { left -= 1 }
            while right + 1 < counts.count && counts[right + 1] > best.element * 7 / 10 { right += 1 }
            columns[name] = [left + start, right + start]
        }
    }
    try JSONSerialization.data(withJSONObject: columns, options: [.sortedKeys]).write(to: output.appendingPathComponent("columns.json"))
    print("Located 252 printed column dividers")
} else if CommandLine.arguments.contains("--verify-text") {
    let entries = try JSONSerialization.jsonObject(with: Data(contentsOf: output.appendingPathComponent("verify-input.json"))) as! [[String: Any]]
    let groups = Dictionary(grouping: entries) { "\($0["round"]!)-\($0["page"]!)" }
    let files = try FileManager.default.contentsOfDirectory(at: root.appendingPathComponent("pdf/test"), includingPropertiesForKeys: nil)
    let queue = OperationQueue(); queue.maxConcurrentOperationCount = 4
    let lock = NSLock()
    let cacheURL = output.appendingPathComponent("verified-text.json")
    let cached = (try? JSONSerialization.jsonObject(with: Data(contentsOf: cacheURL))) as? [String: [String: Any]] ?? [:]
    var verified: [String: Any] = [:], finished = 0
    for (_, group) in groups.sorted(by: { $0.key < $1.key }) {
        queue.addOperation {
            autoreleasepool {
                let round = group[0]["round"] as! Int, pageNumber = group[0]["page"] as! Int
                let file = files.first { $0.pathExtension == "pdf" && $0.lastPathComponent.precomposedStringWithCanonicalMapping.range(of: "(?<![0-9])\(round)(?![0-9])", options: .regularExpression) != nil }!
                let document = PDFDocument(url: file)!, page = document.page(at: pageNumber - 1)!
                let bounds = page.bounds(for: .mediaBox), scale = 3.3
                let width = Int(bounds.width * scale), height = Int(bounds.height * scale)
                let context = CGContext(data: nil, width: width, height: height, bitsPerComponent: 8, bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
                context.setFillColor(NSColor.white.cgColor); context.fill(CGRect(x: 0, y: 0, width: width, height: height))
                context.scaleBy(x: scale, y: scale); page.draw(with: .mediaBox, to: context)
                let image = context.makeImage()!
                var local: [String: Any] = [:]
                for entry in group {
                    let crop = entry["crop"] as! [Double]
                    let id = entry["id"] as! String, sourceHash = entry["sourceHash"] as! String
                    if let prior = cached[id], prior["sourceHash"] as? String == sourceHash, prior["crop"] as? [Double] == crop {
                        local[id] = prior
                        continue
                    }
                    let clipped = image.cropping(to: CGRect(x: floor(crop[0] * Double(width)), y: floor(crop[1] * Double(height)), width: ceil((crop[2] - crop[0]) * Double(width)), height: ceil((crop[3] - crop[1]) * Double(height))))!
                    let request = VNRecognizeTextRequest()
                    request.recognitionLevel = .accurate
                    request.recognitionLanguages = ["ko-KR", "en-US"]
                    request.usesLanguageCorrection = true
                    try! VNImageRequestHandler(cgImage: clipped).perform([request])
                    let lines = (request.results ?? []).sorted { $0.boundingBox.midY > $1.boundingBox.midY }.compactMap { $0.topCandidates(1).first }
                    local[id] = ["text": lines.map(\.string).joined(separator: "\n"), "confidence": lines.map { Double($0.confidence) }.min() ?? 0, "crop": crop, "sourceHash": sourceHash]
                }
                lock.lock()
                verified.merge(local) { _, value in value }; finished += 1
                if finished % 25 == 0 { print("Verified \(finished)/\(groups.count) source pages"); fflush(stdout) }
                lock.unlock()
            }
        }
    }
    queue.waitUntilAllOperationsAreFinished()
    try JSONSerialization.data(withJSONObject: verified, options: [.sortedKeys]).write(to: output.appendingPathComponent("verified-text.json"))
    print("Independently OCR-checked \(entries.count) options from double-resolution PDF renders")
} else if CommandLine.arguments.contains("--measure") {
    let entries = try JSONSerialization.jsonObject(with: Data(contentsOf: output.appendingPathComponent("measure-input.json"))) as! [[String: Any]]
    var current = "", raster: Raster?, measured: [String: Any] = [:]
    for entry in entries {
        let source = entry["source"] as! String
        if source != current { current = source; raster = Raster(assets.appendingPathComponent(source)) }
        let r = raster!, crop = entry["crop"] as! [Double]
        let left = Int(floor(crop[0] * Double(r.width))), top = Int(floor(crop[1] * Double(r.height)))
        let right = Int(ceil(crop[2] * Double(r.width))), bottom = Int(ceil(crop[3] * Double(r.height)))
        let boxes = (entry["regions"] as! [[Double]]).map { b in
            [Int(floor(b[0] * Double(r.width))) - 3, Int(floor(b[1] * Double(r.height))) - 3,
             Int(ceil(b[2] * Double(r.width))) + 3, Int(ceil(b[3] * Double(r.height))) + 3]
        }
        var ink = 0, outside = 0, minX = right, minY = bottom, maxX = left, maxY = top
        var edges = [0, 0, 0, 0]
        for y in top..<bottom {
            for x in left..<right where r.dark(x, y) {
                ink += 1
                if y == top { edges[0] += 1 }
                if x == right - 1 { edges[1] += 1 }
                if y == bottom - 1 { edges[2] += 1 }
                if x == left { edges[3] += 1 }
                minX = min(minX, x); minY = min(minY, y); maxX = max(maxX, x); maxY = max(maxY, y)
                if !boxes.contains(where: { x >= $0[0] && y >= $0[1] && x <= $0[2] && y <= $0[3] }) { outside += 1 }
            }
        }
        let tight = [max(crop[0], Double(minX - 3) / Double(r.width)), max(crop[1], Double(minY - 3) / Double(r.height)),
                     min(crop[2], Double(maxX + 4) / Double(r.width)), min(crop[3], Double(maxY + 4) / Double(r.height))]
        measured[entry["id"] as! String] = ["ink": ink, "outside": outside, "tight": tight, "crop": crop, "edgeInk": edges]
    }
    try JSONSerialization.data(withJSONObject: measured, options: [.sortedKeys]).write(to: output.appendingPathComponent("measurements.json"))
    print("Measured \(entries.count) option regions")
} else if CommandLine.arguments.contains("--contact") {
    let entries = try JSONSerialization.jsonObject(with: Data(contentsOf: output.appendingPathComponent("review.json"))) as! [[String: Any]]
    let cellWidth = 390, cellHeight = 600, columns = 3, perSheet = 12
    for start in stride(from: 0, to: entries.count, by: perSheet) {
        let canvas = NSImage(size: NSSize(width: cellWidth * columns, height: cellHeight * 4))
        canvas.lockFocus()
        NSColor.white.setFill(); NSBezierPath(rect: NSRect(x: 0, y: 0, width: cellWidth * columns, height: cellHeight * 4)).fill()
        for i in start..<min(start + perSheet, entries.count) {
            let entry = entries[i], raster = Raster(assets.appendingPathComponent(entry["source"] as! String))
            let crop = entry["crop"] as! [Double], ix = (i - start) % columns, iy = (i - start) / columns
            let sx = CGFloat(ix * cellWidth + 8), sy = CGFloat((3 - iy) * cellHeight + 8)
            let sourceRect = CGRect(x: crop[0] * Double(raster.width), y: crop[1] * Double(raster.height), width: (crop[2] - crop[0]) * Double(raster.width), height: (crop[3] - crop[1]) * Double(raster.height))
            let cg = raster.image.cropping(to: sourceRect)!
            let scale = min(CGFloat(cellWidth - 16) / CGFloat(cg.width), CGFloat(cellHeight - 36) / CGFloat(cg.height))
            let size = NSSize(width: CGFloat(cg.width) * scale, height: CGFloat(cg.height) * scale)
            NSImage(cgImage: cg, size: size).draw(in: NSRect(x: sx, y: sy, width: size.width, height: size.height))
            let label = entry["id"] as! String
            label.draw(at: NSPoint(x: sx, y: CGFloat((4 - iy) * cellHeight - 25)), withAttributes: [.font: NSFont.boldSystemFont(ofSize: 16), .foregroundColor: NSColor.black])
            for (j, b) in (entry["options"] as! [[Double]]).enumerated() {
                let rect = NSRect(x: sx + CGFloat((b[0] - crop[0]) * Double(raster.width)) * scale, y: sy + size.height - CGFloat((b[3] - crop[1]) * Double(raster.height)) * scale, width: CGFloat((b[2] - b[0]) * Double(raster.width)) * scale, height: CGFloat((b[3] - b[1]) * Double(raster.height)) * scale)
                [NSColor.red, .blue, .systemGreen, .systemPurple, .systemOrange][j].setStroke()
                let border = NSBezierPath(rect: rect); border.lineWidth = 1.5; border.stroke()
            }
        }
        canvas.unlockFocus()
        let rep = NSBitmapImageRep(data: canvas.tiffRepresentation!)!
        try rep.representation(using: .png, properties: [:])!.write(to: output.appendingPathComponent("review-\(start / perSheet + 1).png"))
    }
    print("Created \(entries.count) annotated review contacts")
} else if CommandLine.arguments.contains("--crop") {
    let manifest = try JSONSerialization.jsonObject(with: Data(contentsOf: output.appendingPathComponent("manifest.json"))) as! [String: Any]
    let entries = manifest["images"] as! [[String: Any]]
    var current = "", raster: Raster?
    for entry in entries {
        let source = entry["source"] as! String
        if source != current { current = source; raster = Raster(assets.appendingPathComponent(source)) }
        let r = raster!, crop = entry["crop"] as! [Double]
        let left = Int(floor(crop[0] * Double(r.width))), top = Int(floor(crop[1] * Double(r.height)))
        let right = Int(ceil(crop[2] * Double(r.width))), bottom = Int(ceil(crop[3] * Double(r.height)))
        let image = r.image.cropping(to: CGRect(x: left, y: top, width: right - left, height: bottom - top))!
        let data = NSBitmapImageRep(cgImage: image).representation(using: .jpeg, properties: [.compressionFactor: 0.94])!
        try data.write(to: output.appendingPathComponent(entry["file"] as! String))
    }
    print("Cropped \(entries.count) independent options")
} else {
    fatalError("Use --detect, --columns, --verify-text, --measure, --contact or --crop")
}
