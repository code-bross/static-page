"""
Mind Map Skill - Convert Markdown to interactive mind maps using Markmap
Pure frontend conversion - no LLM required
"""

import argparse
import html as html_lib
import os
import subprocess
import sys
import re
import shutil
from pathlib import Path
from loguru import logger

logger.remove()
logger.add(sys.stderr, level="INFO")


def build_static_mindmap(markdown_content: str) -> str:
    root = {"title": "", "level": 0, "children": []}
    stack = [root]

    for line in markdown_content.splitlines():
        match = re.match(r"^(#{1,6})\s+(.+?)\s*$", line)
        if not match:
            continue
        level = len(match.group(1))
        title = match.group(2)
        node = {"title": title, "level": level, "children": []}
        while stack[-1]["level"] >= level:
            stack.pop()
        stack[-1]["children"].append(node)
        stack.append(node)

    def render(nodes: list[dict]) -> str:
        output = []
        for node in nodes:
            title = html_lib.escape(node["title"])
            children = node["children"]
            child_titles = "\n".join(child["title"] for child in children)
            details = html_lib.escape(
                f"{node['title']}\n\n관련 개념\n{child_titles}" if child_titles else node["title"],
                quote=True,
            )
            output.append(
                f'<div class="static-branch"><button class="static-node static-level-{node["level"]}" '
                f'data-title="{title}" data-details="{details}">{title}</button>'
            )
            if children:
                output.append(f'<div class="static-children">{render(children)}</div>')
            output.append("</div>")
        return "".join(output)

    return f'<div id="static-mindmap" aria-label="CSIA 개념 마인드맵">{render(root["children"])}</div>'


def inject_custom_features(html_path: str, markdown_content: str) -> None:
    """Inject custom JavaScript for default collapse and export functionality."""

    logger.info("Injecting custom features...")

    with open(html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Custom JavaScript to add features
    custom_script = """
<style>
  #control-panel {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    background: white;
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  #control-panel button {
    background: #4285f4;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background 0.2s;
    white-space: nowrap;
  }

  #control-panel button:hover {
    background: #3367d6;
  }

  #control-panel button:active {
    background: #2851a3;
  }

  #control-panel button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .node-circle {
    cursor: pointer;
  }

  #mindmap {
    display: block;
  }

  #static-mindmap {
    display: none;
    min-height: 100vh;
    padding: 104px 42px 56px;
    box-sizing: border-box;
    background:
      radial-gradient(circle at 12% 8%, rgba(91, 112, 255, 0.18), transparent 28rem),
      radial-gradient(circle at 88% 18%, rgba(37, 211, 182, 0.10), transparent 24rem),
      #17191f;
    color: #f4f6fb;
    font: 15px/1.45 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    min-height: 100vh;
    overflow: auto;
  }

  #static-mindmap > .static-branch {
    width: min(1440px, 100%);
    margin: 0 auto;
  }

  .static-branch {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  .static-children {
    display: flex;
    flex-direction: column;
    gap: 9px;
    padding-left: 18px;
    border-left: 1px solid rgba(151, 164, 205, 0.35);
  }

  #static-mindmap > .static-branch > .static-children {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
    margin-top: 26px;
    padding: 0;
    border: 0;
  }

  #static-mindmap > .static-branch > .static-children > .static-branch {
    display: block;
    padding: 18px;
    border: 1px solid rgba(151, 164, 205, 0.22);
    border-radius: 18px;
    background: rgba(30, 34, 45, 0.78);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.18);
  }

  #static-mindmap > .static-branch > .static-children > .static-branch > .static-children {
    margin-top: 14px;
  }

  .static-node {
    position: relative;
    z-index: 1;
    max-width: 280px;
    padding: 8px 12px;
    border: 1px solid rgba(151, 164, 205, 0.34);
    border-radius: 9px;
    background: rgba(42, 47, 61, 0.9);
    color: #f1f3f4;
    cursor: pointer;
    font: inherit;
    text-align: left;
    white-space: normal;
    transition: transform 140ms ease, border-color 140ms ease, background 140ms ease, box-shadow 140ms ease;
  }

  .static-node:hover,
  .static-node:focus-visible {
    transform: translateY(-2px);
    border-color: #9fb8ff;
    background: #3b4660;
    outline: 3px solid rgba(138, 180, 248, 0.3);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
  }

  .static-level-1 {
    display: block;
    max-width: none;
    padding: 14px 18px;
    border: 0;
    background: linear-gradient(135deg, #5668d8, #7656c9);
    font-size: 22px;
    font-weight: 700;
  }

  .static-level-2 {
    display: block;
    max-width: none;
    width: 100%;
    box-sizing: border-box;
    border-color: rgba(126, 232, 211, 0.36);
    color: #d9fff6;
    font-size: 17px;
    font-weight: 650;
  }

  .static-level-3,
  .static-level-4,
  .static-level-5,
  .static-level-6 {
    font-size: 14px;
  }

  @media (max-width: 900px) {
    #static-mindmap {
      padding: 88px 18px 36px;
    }

    #static-mindmap > .static-branch > .static-children {
      grid-template-columns: 1fr;
    }
  }

  .mindmap-click-target {
    display: inline-block !important;
    cursor: pointer;
    pointer-events: auto;
    padding: 4px 8px;
    border: 1px solid transparent;
    border-radius: 6px;
    transition: background-color 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
  }

  .markmap-native-node {
    display: inline;
    appearance: none;
    border: 0;
    padding: 0;
    margin: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    line-height: inherit;
    text-align: left;
    cursor: pointer;
    pointer-events: auto;
  }

  .markmap-native-node:hover,
  .markmap-native-node:focus-visible {
    color: #8ab4f8;
    outline: 2px solid rgba(138, 180, 248, 0.75);
    outline-offset: 3px;
    border-radius: 3px;
  }

  .mindmap-click-target:hover,
  .mindmap-click-target:focus {
    background: #eef4ff;
    border-color: #4285f4;
    outline: none;
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.18);
  }

  #prompt-display {
    position: fixed;
    top: 50%;
    left: 50%;
    width: min(620px, calc(100vw - 32px));
    transform: translate(-50%, -50%);
    background: #f8f9fa;
    border: 1px solid #dadce0;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    display: none;
    z-index: 1000;
  }

  #prompt-display.show {
    display: block;
  }

  #prompt-text {
    margin: 8px 0;
    padding: 12px;
    background: white;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.5;
    color: #202124;
    white-space: pre-wrap;
    max-height: 55vh;
    overflow-y: auto;
  }

  #prompt-actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  #prompt-actions button {
    background: #4285f4;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
  }

  #prompt-actions button:hover {
    background: #3367d6;
  }

  #prompt-actions .close-btn {
    background: #5f6368;
  }

  #prompt-actions .close-btn:hover {
    background: #3c4043;
  }
</style>

<div id="control-panel">
  <button id="export-png-btn">Export PNG</button>
  <button id="export-html-btn">Export HTML</button>
</div>

<div id="prompt-display">
  <div style="font-weight: 600; color: #5f6368; font-size: 12px; text-transform: uppercase;">Concept Details</div>
  <div id="prompt-text"></div>
  <div id="prompt-actions">
    <button id="copy-prompt-btn">Copy Details</button>
    <button class="close-btn" id="close-prompt-btn">Close</button>
  </div>
</div>

<script>
(function() {
  // Set up export functions immediately - they'll wait for dependencies when called
  const mm = window.markmap;

    function collectInlineStyles() {
      const styles = [];
      document.querySelectorAll('style').forEach(style => {
        if (style.textContent) {
          styles.push(style.textContent);
        }
      });
      return styles.join('\\n');
    }

    function downloadDataUrl(dataUrl, filename) {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // Collapse to first level only on load
    function collapseToFirstLevel() {
      const svg = document.querySelector('svg');
      if (!svg) return;

      const allNodes = svg.querySelectorAll('g[data-depth]');
      allNodes.forEach(node => {
        const depth = parseInt(node.getAttribute('data-depth'));
        // Collapse everything except root (depth 0) and first level (depth 1)
        if (depth > 1) {
          const circle = node.querySelector('circle');
          if (circle && circle.classList.contains('markmap-node')) {
            // Trigger collapse by simulating click
            const nodeData = node.__data__;
            if (nodeData && nodeData.children && nodeData.p) {
              nodeData.p = nodeData.children;
              delete nodeData.children;
            }
          }
        }
      });

      // Force redraw if markmap instance is available
      if (mm && mm.Markmap) {
        const svg = document.querySelector('svg');
        if (svg && svg.__markmap) {
          svg.__markmap.fit();
        }
      }
    }

    function svgToDataUrl(svgString) {
      const encoded = btoa(unescape(encodeURIComponent(svgString)));
      return `data:image/svg+xml;base64,${encoded}`;
    }

    // Export as PNG - Render SVG to canvas
    async function exportPNG() {
      const btn = document.getElementById('export-png-btn');
      if (!btn) {
        console.error('Export PNG button not found');
        return;
      }
      
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Exporting...';

      try {
        const svg = document.querySelector('svg');
        if (!svg) {
          throw new Error('SVG not found. Please wait for the mindmap to load.');
        }

        const clonedSvg = svg.cloneNode(true);
        const inlineStyles = collectInlineStyles();
        if (inlineStyles) {
          const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
          styleEl.textContent = inlineStyles;
          clonedSvg.insertBefore(styleEl, clonedSvg.firstChild);
        }

        let bbox;
        try {
          bbox = svg.getBBox();
        } catch (e) {
          const viewBox = svg.getAttribute('viewBox');
          if (viewBox) {
            const parts = viewBox.split(/\\s+/);
            bbox = {
              x: parseFloat(parts[0]) || 0,
              y: parseFloat(parts[1]) || 0,
              width: parseFloat(parts[2]) || svg.clientWidth || 800,
              height: parseFloat(parts[3]) || svg.clientHeight || 600
            };
          } else {
            bbox = {
              x: 0,
              y: 0,
              width: svg.clientWidth || 800,
              height: svg.clientHeight || 600
            };
          }
        }

        clonedSvg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
        clonedSvg.setAttribute('width', bbox.width);
        clonedSvg.setAttribute('height', bbox.height);
        if (!clonedSvg.getAttribute('xmlns')) {
          clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        }
        if (!clonedSvg.getAttribute('xmlns:xlink')) {
          clonedSvg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        }

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(clonedSvg);
        const svgDataUrl = svgToDataUrl(svgString);

        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = () => reject(new Error('Failed to load SVG image'));
          img.src = svgDataUrl;
        });

        const scale = 2;
        const canvas = document.createElement('canvas');
        canvas.width = Math.ceil(bbox.width * scale);
        canvas.height = Math.ceil(bbox.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, bbox.width, bbox.height);

        let dataUrl;
        try {
          dataUrl = canvas.toDataURL('image/png');
        } catch (canvasError) {
          const msg = String(canvasError || '');
          if (msg.toLowerCase().includes('insecure')) {
            throw new Error('PNG export blocked by browser security. Please open the HTML via a local web server (e.g. python -m http.server) and try again.');
          }
          throw canvasError;
        }

        downloadDataUrl(dataUrl, 'mindmap.png');

        btn.textContent = 'Exported!';
        setTimeout(function() {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 2000);
      } catch (error) {
        console.error('PNG export error:', error);
        const errorMsg = error && error.message ? error.message : (typeof error === 'string' ? error : 'Unknown error occurred');
        alert('Export failed: ' + errorMsg);
        btn.textContent = 'Error';
        setTimeout(function() {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 2000);
      }
    }

    // Export as HTML - Save current page as HTML file
    function exportHTML() {
      const btn = document.getElementById('export-html-btn');
      if (!btn) {
        console.error('Export HTML button not found');
        return;
      }
      
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Exporting...';

      try {
        const html = '<!DOCTYPE html>\\n' + document.documentElement.outerHTML;
        const dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
        downloadDataUrl(dataUrl, 'mindmap.html');

        btn.textContent = 'Exported!';
        setTimeout(function() {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 2000);
      } catch (error) {
        console.error('HTML export error:', error);
        const errorMsg = error && error.message ? error.message : (typeof error === 'string' ? error : 'Unknown error occurred');
        alert('Export failed: ' + errorMsg);
        btn.textContent = 'Error';
        setTimeout(function() {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 2000);
      }
    }

    // Add click handlers for export buttons - attach immediately
    function attachExportHandlers() {
      const pngBtn = document.getElementById('export-png-btn');
      const htmlBtn = document.getElementById('export-html-btn');
      
      if (pngBtn && !pngBtn.dataset.listenerAttached) {
        pngBtn.addEventListener('click', exportPNG);
        pngBtn.dataset.listenerAttached = 'true';
      }
      
      if (htmlBtn && !htmlBtn.dataset.listenerAttached) {
        htmlBtn.addEventListener('click', exportHTML);
        htmlBtn.dataset.listenerAttached = 'true';
      }
    }
    
    // Try to attach immediately
    attachExportHandlers();
    
    // Also try after a short delay in case buttons aren't ready yet
    setTimeout(attachExportHandlers, 100);
    setTimeout(attachExportHandlers, 500);

    // Node click handler to show prompt
    const promptDisplay = document.getElementById('prompt-display');
    const promptText = document.getElementById('prompt-text');

    function showPrompt(nodeText, nodeData) {
      const content = (nodeData && nodeData.content) || nodeText;
      const children = (nodeData && (nodeData.children || nodeData.p)) || [];
      const related = children.length
        ? `\n\nRelated concepts\n${children.map(child => `• ${(child.content || '').replace(/<[^>]*>/g, '')}`).join('\n')}`
        : '\n\nThis is a detailed concept node.';
      const details = `${content.replace(/<[^>]*>/g, '')}${related}`;
      promptText.textContent = details;
      promptDisplay.classList.add('show');

      promptDisplay.dataset.prompt = details;
    }

    // Copy to clipboard
    document.getElementById('copy-prompt-btn').addEventListener('click', function() {
      const prompt = promptDisplay.dataset.prompt;
      navigator.clipboard.writeText(prompt).then(function() {
        const btn = document.getElementById('copy-prompt-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function() {
          btn.textContent = originalText;
        }, 2000);
      });
    });

    // Close prompt display
    document.getElementById('close-prompt-btn').addEventListener('click', function() {
      promptDisplay.classList.remove('show');
    });

    document.querySelectorAll('.static-node').forEach(function(node) {
      node.addEventListener('click', function() {
        showPrompt(node.dataset.title, { content: node.dataset.details });
      });
    });

    // Add click listeners after Markmap has rendered its HTML-backed nodes.
    function attachNodeClickHandler() {
      document.querySelectorAll('foreignObject.markmap-foreign').forEach(contentElement => {
        const openDetails = function(e) {
          const nodeGroup = contentElement.closest('g.markmap-node[data-depth]');
          if (!nodeGroup) return;

          const nodeText = contentElement.textContent.trim();
          const depth = parseInt(nodeGroup.getAttribute('data-depth'));
          if (depth >= 0 && nodeText) {
            showPrompt(nodeText, nodeGroup.__data__);
            e.stopPropagation();
          }
        };

        const target = contentElement.querySelector('div');
        const existingButton = target && target.querySelector(':scope > button.markmap-native-node');
        if (contentElement.dataset.clickAttached && existingButton) return;
        contentElement.dataset.clickAttached = 'true';
        contentElement.style.pointerEvents = 'auto';

        if (target) {
          target.classList.add('mindmap-click-target');
          const button = existingButton || document.createElement('button');
          button.className = 'markmap-native-node';
          button.type = 'button';
          button.setAttribute('aria-label', `개념 상세 보기: ${contentElement.textContent.trim()}`);
          if (!existingButton) {
            button.innerHTML = target.innerHTML;
            target.replaceChildren(button);
          }
          button.addEventListener('click', function(e) {
            openDetails(e);
          });
        }

        if (target) {
          target.querySelector('.markmap-native-node').addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openDetails(e);
            }
          });
        }
      });
    }

    const nodeObserver = new MutationObserver(attachNodeClickHandler);
    nodeObserver.observe(document.body, { childList: true, subtree: true });
    attachNodeClickHandler();


})(); // End of IIFE
</script>
"""

    static_mindmap = build_static_mindmap(markdown_content)
    html_content = html_content.replace('<svg id="mindmap"', f'{static_mindmap}<svg id="mindmap"')
    html_content = html_content.replace('</body>', f'{custom_script}</body>')

    # Write modified HTML back
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

    logger.info("✓ Custom features injected")


def get_markmap_command() -> list[str]:
    """Find a local markmap-cli command or fall back to npx."""

    markmap_bin = shutil.which("markmap")
    if markmap_bin:
        return [markmap_bin]

    npm_cache = Path.home() / '.npm' / '_npx'
    if npm_cache.exists():
        candidates = list(npm_cache.glob('*/node_modules/markmap-cli/bin/cli.js'))
        if candidates:
            latest = max(candidates, key=lambda path: path.stat().st_mtime)
            node_bin = shutil.which('node') or 'node'
            return [node_bin, str(latest)]

    return ['npx', '-y', 'markmap-cli']


def ensure_katex_fonts(html_path: str) -> None:
    """Copy KaTeX fonts next to the output HTML if needed."""

    with open(html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    if 'katex' not in html_content or 'fonts/KaTeX_' not in html_content:
        return

    output_dir = Path(html_path).resolve().parent
    fonts_dir = output_dir / 'fonts'

    npm_cache = Path.home() / '.npm' / '_npx'
    if not npm_cache.exists():
        logger.warning("KaTeX fonts not copied: npm cache not found")
        return

    font_paths = list(npm_cache.glob('*/node_modules/markmap-cli/dist/assets/katex@*/dist/fonts'))
    if not font_paths:
        logger.warning("KaTeX fonts not copied: markmap-cli assets not found")
        return

    source_fonts = max(font_paths, key=lambda path: path.stat().st_mtime)
    fonts_dir.mkdir(parents=True, exist_ok=True)

    for font_file in source_fonts.glob('*'):
        if font_file.is_file():
            shutil.copy2(font_file, fonts_dir / font_file.name)

    logger.info(f"✓ KaTeX fonts copied to: {fonts_dir}")


def convert_markdown_to_mindmap(markdown_path: str, output_path: str) -> str:
    """Convert Markdown file to interactive HTML mind map using markmap-cli."""

    logger.info("=" * 60)
    logger.info("MIND MAP CONVERSION STARTED")
    logger.info("=" * 60)

    # Verify input file exists
    if not os.path.exists(markdown_path):
        raise FileNotFoundError(f"Input file not found: {markdown_path}")

    # Read markdown to verify it's not empty
    with open(markdown_path, 'r', encoding='utf-8') as f:
        markdown_content = f.read()

    if not markdown_content.strip():
        raise ValueError(f"Input file is empty: {markdown_path}")

    logger.info(f"Input: {markdown_path} ({len(markdown_content)} chars)")
    logger.info(f"Output: {output_path}")
    logger.info("Converting Markdown to interactive HTML using Markmap...")

    try:
        markmap_cmd = get_markmap_command()
        cmd = [
            *markmap_cmd,
            '--offline',  # Include all assets for offline viewing
            markdown_path,
            '-o', output_path
        ]

        logger.info(f"Running: {' '.join(cmd)}")

        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=60
        )

        if result.returncode != 0:
            logger.error(f"markmap-cli error: {result.stderr}")
            raise RuntimeError(f"Failed to generate HTML: {result.stderr}")

        if not os.path.exists(output_path):
            raise FileNotFoundError(f"Output file not created: {output_path}")

        # Inject custom features
        inject_custom_features(output_path, markdown_content)
        ensure_katex_fonts(output_path)

        file_size = os.path.getsize(output_path) / 1024

        logger.info("=" * 60)
        logger.info(f"✓ CONVERSION COMPLETED")
        logger.info(f"✓ Interactive mind map saved: {output_path} ({file_size:.1f} KB)")
        logger.info("=" * 60)

        return output_path

    except subprocess.TimeoutExpired:
        logger.error("Conversion timed out after 60 seconds")
        raise RuntimeError("Conversion timed out")
    except Exception as e:
        logger.error("=" * 60)
        logger.error("✗ CONVERSION FAILED")
        logger.error(f"Error: {type(e).__name__}: {str(e)}")
        logger.error("=" * 60)
        raise


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Convert Markdown to interactive mind maps using Markmap"
    )
    parser.add_argument(
        "--input", "-i",
        required=True,
        help="Input Markdown file path"
    )
    parser.add_argument(
        "--output", "-o",
        default="mindmap.html",
        help="Output HTML file path (default: mindmap.html)"
    )

    args = parser.parse_args()

    try:
        result = convert_markdown_to_mindmap(args.input, args.output)

        if os.path.exists(result):
            size = os.path.getsize(result) / 1024
            print(f"✓ Mind map created: {result} ({size:.1f} KB)")
            print(f"✓ Open in browser: file://{os.path.abspath(result)}")
            print()
            print("Features:")
            print("  • Export as PNG or HTML using buttons in top-right")
            print("  • Click node text to generate discussion prompt")
            print("  • Click branch circles to expand/collapse")
        else:
            print(f"✗ Error: File not created at {result}")
            sys.exit(1)

    except KeyboardInterrupt:
        print("\n✗ Conversion cancelled by user")
        sys.exit(130)
    except Exception as e:
        print(f"✗ Error: {type(e).__name__}: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    main()
