---
name: image-search
description: Search and fetch authentic, high-resolution photos for places, restaurants, menu dishes, landmarks, and products. Use when the user requests finding or mapping real photos for itinerary spots or food items.
---

# Image Search Skill (사진/이미지 검색 및 매핑 스킬)

This skill provides instructions, guidelines, and helper utilities for searching, verifying, and mapping authentic high-resolution photos for travel places, restaurants, dishes, and shopping products into project datasets (such as `data.json`) or static web pages.

---

## 🎯 Usage Protocol

When the user asks to search for photos, find images, or remap photos for places/dishes:

1. **Query Search Strategy**:
   - For **Restaurants/Dishes**: Search using the English or local language name of the establishment and dish (e.g. `"Pork's Mostecka Prague"` or `"Wiener Schnitzel Figlmüller"`).
   - For **Landmarks/Attractions**: Search using the official city name and landmark title (e.g. `"Halászbástya Budapest"` or `"St. Vitus Cathedral Prague"`).

2. **Quality & Filtering Rules**:
   - ❌ **Do NOT use generic Unsplash placeholder images** (`images.unsplash.com`).
   - ❌ **Do NOT use generic Wikimedia Commons fallback thumbnails** (`upload.wikimedia.org`).
   - ❌ **Do NOT use low-resolution Google thumbnail URLs** (`encrypted-tbn0.gstatic.com`).
   - ✅ **Use authentic CDN image URLs** from reliable travel & dining services (e.g., Triple Guide `media.triple.guide`, TripAdvisor `dynamic-media-cdn.tripadvisor.com`, CloudFront `cloudfront.net`, or official restaurant/brand CDNs).

3. **Executing Helper Tool/Script**:
   - Run the helper script `.agents/skills/image-search/scripts/search_images.py` to search for photo links:
     ```bash
     python3 .agents/skills/image-search/scripts/search_images.py "<Search Query>" <MaxResults>
     ```
   - Alternatively, use the agent's `search_web` tool with the query `"<Search Query> photo URL"` to extract exact image URLs.

4. **1-to-1 Mapping Guarantee**:
   - Ensure every dish or place in `data.json` gets a **100% unique, dish-matched image URL**.
   - No two different dishes should share the exact same image URL.

---

## 📁 Directory Structure

```
.agents/skills/image-search/
├── SKILL.md
└── scripts/
    └── search_images.py
```
