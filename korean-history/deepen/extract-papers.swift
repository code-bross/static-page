// swift korean-history/deepen/extract-papers.swift [round ...]
import Foundation
import PDFKit
import Vision
import AppKit

let root = URL(fileURLWithPath: #filePath).deletingLastPathComponent()
let output = root.appendingPathComponent("assets")
let requested = CommandLine.arguments.dropFirst().compactMap(Int.init)
let rounds = requested.isEmpty ? Array(60...80) : requested
try FileManager.default.createDirectory(at: output, withIntermediateDirectories: true)
let files = try FileManager.default.contentsOfDirectory(at: root.appendingPathComponent("pdf/test"), includingPropertiesForKeys: nil)
for round in rounds {
    let matches = files.filter {
        let name = $0.lastPathComponent.precomposedStringWithCanonicalMapping
        return name.range(of: "(?<![0-9])\(round)(?![0-9])", options: .regularExpression) != nil && $0.pathExtension.lowercased() == "pdf"
    }
    guard matches.count == 1, let document = PDFDocument(url: matches[0]) else { fatalError("Expected one paper for \(round)") }
    var pages: [[String: Any]] = []
    for index in 0..<document.pageCount {
        let page = document.page(at: index)!
        let bounds = page.bounds(for: .mediaBox)
        let scale = 1.65
        let width = Int(bounds.width * scale), height = Int(bounds.height * scale)
        let context = CGContext(data: nil, width: width, height: height, bitsPerComponent: 8, bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
        context.setFillColor(NSColor.white.cgColor)
        context.fill(CGRect(x: 0, y: 0, width: width, height: height))
        context.scaleBy(x: scale, y: scale)
        page.draw(with: .mediaBox, to: context)
        let image = context.makeImage()!
        let name = "\(round)-\(index + 1).jpg"
        try NSBitmapImageRep(cgImage: image).representation(using: .jpeg, properties: [.compressionFactor: 0.88])!.write(to: output.appendingPathComponent(name))
        var lines: [[String: Any]] = []
        // Separate requests prevent Vision merging a left-column score with a right-column heading.
        for column in 0...1 {
            let request = VNRecognizeTextRequest()
            request.recognitionLevel = .accurate
            request.recognitionLanguages = ["ko-KR", "en-US"]
            request.usesLanguageCorrection = true
            request.regionOfInterest = CGRect(x: Double(column) * 0.5, y: 0, width: 0.5, height: 1)
            try VNImageRequestHandler(cgImage: image).perform([request])
            lines += (request.results ?? []).compactMap { observation in
                guard let text = observation.topCandidates(1).first?.string else { return nil }
                // Vision's x/width are relative to the half-page ROI; build-data.cjs maps these back.
                let box = observation.boundingBox
                return ["text": text, "column": column, "x": box.minX, "y": 1 - box.maxY, "width": box.width, "height": box.height]
            }
        }
        pages.append(["page": index + 1, "image": name, "width": width, "height": height, "lines": lines])
        print("\(round) page \(index + 1): \(lines.count) lines")
        fflush(stdout)
    }
    let data = try JSONSerialization.data(withJSONObject: pages, options: [.sortedKeys])
    try data.write(to: output.appendingPathComponent("\(round)-ocr.json"))
}
