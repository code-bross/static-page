#!/usr/bin/env python3
"""
Image Search Helper Script for image-search skill.
Searches and returns clean, high-resolution photo URLs for travel places & food items.
"""

import sys
import json
import re
import urllib.request
import urllib.parse

def find_image_urls(query, max_results=5):
    """
    Returns high-resolution photo URLs for a given query, avoiding unsplash/wikimedia/thumbnails.
    """
    encoded = urllib.parse.quote(query)
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    }

    results = []

    # Try searching Bing Images
    try:
        url = f"https://www.bing.com/images/search?q={encoded}"
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as response:
            html = response.read().decode('utf-8', errors='ignore')
            matches = re.findall(r'murl&quot;:&quot;(https?://[^\"]+?)&quot;', html)
            for m in matches:
                clean_url = m.replace('\\/', '/')
                if not any(bad in clean_url.lower() for bad in ["unsplash.com", "wikimedia.org", "encrypted-tbn", "base64"]):
                    if clean_url not in [r["url"] for r in results]:
                        results.append({
                            "query": query,
                            "url": clean_url
                        })
                    if len(results) >= max_results:
                        break
    except Exception:
        pass

    return results

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 search_images.py <query> [max_results]")
        sys.exit(1)

    q = sys.argv[1]
    limit = int(sys.argv[2]) if len(sys.argv) > 2 else 5
    res = find_image_urls(q, limit)
    print(json.dumps(res, ensure_ascii=False, indent=2))
