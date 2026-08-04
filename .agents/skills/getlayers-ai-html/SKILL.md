---
name: getlayers-ai-html
description: Guidelines, design tokens, ready-to-use HTML/CSS/JS components, and animation patterns for creating cinematic, high-aesthetic AI landing pages and modern web applications inspired by GetLayers.ai. Use when creating premium, luxury dark-mode, mesh-gradient, and interactive 3D/spotlight static web pages.
---

# GetLayers.ai Style HTML & Vanilla Web Skill Guide

[GetLayers.ai](https://www.getlayers.ai/) is an AI-native design methodology focused on **cinematic, agency-grade, high-aesthetic web design**—moving away from generic flat web templates to rich atmospheric design, glowing mesh gradients, interactive spotlight tracking, and 3D card depth.

This skill provides ready-to-use HTML, CSS, and Vanilla JavaScript patterns to build **GetLayers-level static websites**.

---

## 1. GetLayers Design System & Tokens

Add these design tokens to `css/variables.css`:

```css
:root {
  /* Color Palette (Atmospheric Dark Mode) */
  --layers-bg: #07090e;
  --layers-surface: #0e121b;
  --layers-surface-hover: #151b27;
  --layers-border: rgba(255, 255, 255, 0.08);
  --layers-border-glow: rgba(120, 119, 198, 0.3);

  /* Brand Accents */
  --accent-cyan: #38bdf8;
  --accent-purple: #a855f7;
  --accent-emerald: #34d399;
  --gradient-glow: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(168, 85, 247, 0.15));
  --gradient-text: linear-gradient(135deg, #ffffff 30%, rgba(255, 255, 255, 0.5));
  --gradient-accent: linear-gradient(135deg, #38bdf8, #a855f7);

  /* Typography */
  --font-heading: 'Outfit', 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* Elevation & Glassmorphism */
  --glass-bg: rgba(14, 18, 27, 0.7);
  --glass-blur: blur(20px);
  --shadow-luxe: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

body {
  background-color: var(--layers-bg);
  color: #f3f4f6;
  font-family: var(--font-body);
  margin: 0;
  overflow-x: hidden;
}
```

---

## 2. Key Components & Implementation

### Component A: Ambient Mesh Glow & Cursor Spotlight Tracker

An interactive background radial glow that tracks mouse movement across cards or hero sections.

#### HTML
```html
<div class="layers-hero">
  <div class="ambient-mesh-orb orb-1"></div>
  <div class="ambient-mesh-orb orb-2"></div>
  
  <div class="hero-content">
    <div class="badge-pill">
      <span class="badge-glow"></span>
      <span>AI-Native Layer System</span>
    </div>
    <h1 class="hero-title">Build Cinematic Web Experiences</h1>
    <p class="hero-sub">Empower your web apps with agency-grade motion, 3D depth, and atmospheric design.</p>
    <div class="hero-actions">
      <a href="#" class="btn-luxe-primary">
        <span>Explore Layers</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
      <a href="#" class="btn-luxe-secondary">View Documentation</a>
    </div>
  </div>
</div>
```

#### CSS
```css
.layers-hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 20px;
  overflow: hidden;
}

/* Ambient Background Orbs */
.ambient-mesh-orb {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.45;
  pointer-events: none;
}
.orb-1 { top: -100px; left: 15%; background: var(--accent-purple); }
.orb-2 { top: 100px; right: 15%; background: var(--accent-cyan); }

/* Badge Pill */
.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--layers-border);
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
  backdrop-filter: var(--glass-blur);
}
.badge-glow {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-cyan);
  box-shadow: 0 0 10px var(--accent-cyan);
}

/* Gradient Heading */
.hero-title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  max-width: 900px;
  margin: 0 auto 20px;
}

/* Primary Luxe Button with Hover Border Glow */
.btn-luxe-primary {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 12px;
  background: var(--gradient-accent);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 0 25px rgba(56, 189, 248, 0.35);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.btn-luxe-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 35px rgba(168, 85, 247, 0.5);
}
```

---

### Component B: Interactive Spotlight Tracking Cards Grid

Cards that track mouse cursor movement and render a dynamic spotlight border effect.

#### HTML
```html
<div class="spotlight-grid">
  <div class="spotlight-card">
    <div class="card-border"></div>
    <div class="card-inner">
      <div class="icon-box">✦</div>
      <h3>3D Layer Visualizer</h3>
      <p>Real-time depth rendering with procedural noise and glass shader effects.</p>
    </div>
  </div>
  <div class="spotlight-card">
    <div class="card-border"></div>
    <div class="card-inner">
      <div class="icon-box">⚡</div>
      <h3>Prompt-to-Code Pipeline</h3>
      <p>Clean, semantic, self-contained HTML/CSS output with zero bloat.</p>
    </div>
  </div>
</div>
```

#### CSS & JS
```css
.spotlight-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
}

.spotlight-card {
  position: relative;
  border-radius: 16px;
  background: var(--layers-surface);
  border: 1px solid var(--layers-border);
  padding: 32px;
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.spotlight-card::before {
  content: '';
  position: absolute;
  top: var(--mouse-y, -100px);
  left: var(--mouse-x, -100px);
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.25), transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.spotlight-card:hover::before {
  opacity: 1;
}
```

```javascript
// JS Mouse Tracker Script
document.querySelectorAll('.spotlight-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});
```

---

## 3. GetLayers Aesthetics Checklist
- [ ] Deep atmospheric dark background (`#07090e`) with vibrant neon accent blur orbs.
- [ ] Interactive spotlight tracking on grid cards (`mousemove` relative coordinates).
- [ ] Gradient headings using mask clipped backgrounds.
- [ ] Glassmorphic headers and badges (`backdrop-filter: blur(20px)`).
- [ ] Smooth subtle hover lifts with colored shadow glows (`box-shadow: 0 0 25px`).
