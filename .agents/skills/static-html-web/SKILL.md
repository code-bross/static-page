---
name: static-html-web
description: Best practices, design system architecture, responsive layout rules, aesthetic standards, and modern web development workflows for creating high-performance, visually stunning static HTML/CSS/JS websites. Use when creating or refining static web pages, landings, or UI components.
---

# Static HTML Web Development Skill Guide

This skill provides comprehensive guidelines and standards for building modern, high-quality, responsive static websites using HTML5, Vanilla CSS, and JavaScript.

---

## 1. Project Architecture

Maintain a clean, organized folder structure:

```text
project-root/
├── index.html
├── css/
│   ├── variables.css      # Design tokens (colors, typography, spacing)
│   ├── reset.css          # Modern CSS reset
│   └── style.css          # Main layout and component styles
├── js/
│   └── main.js            # Interactive logic and DOM operations
└── assets/
    ├── images/            # Static images and icons
    └── fonts/             # Custom web fonts (if offline)
```

---

## 2. Core HTML5 Standards

- **Semantic HTML**: Use proper tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- **SEO Optimization**:
  - Distinct and descriptive `<title>` tag on every page.
  - `<meta name="description">` providing clear summaries.
  - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
  - Open Graph (`og:title`, `og:description`, `og:image`) tags.
- **Accessibility (a11y)**:
  - Add meaningful `alt` attributes to images.
  - Ensure interactive elements have unique IDs and accessible labels (`aria-label`, `aria-expanded`).
  - Provide a skip link for keyboard navigation.

---

## 3. Design System & Vanilla CSS

- **Design Tokens**: Define HSL-based CSS custom properties for cohesive themes (light/dark mode).
```css
:root {
  /* Color Palette */
  --bg-primary: hsl(220, 20%, 97%);
  --bg-surface: hsl(0, 0%, 100%);
  --text-primary: hsl(220, 30%, 12%);
  --text-secondary: hsl(220, 15%, 45%);
  --accent-color: hsl(250, 84%, 60%);
  --accent-hover: hsl(250, 84%, 54%);
  
  /* Glassmorphism & Shadows */
  --glass-bg: rgba(255, 255, 255, 0.75);
  --glass-border: rgba(255, 255, 255, 0.3);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.12);

  /* Typography & Spacing */
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;
  --radius-md: 12px;
  --radius-lg: 20px;
  --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: hsl(220, 25%, 8%);
    --bg-surface: hsl(220, 20%, 13%);
    --text-primary: hsl(220, 20%, 95%);
    --text-secondary: hsl(220, 15%, 70%);
    --glass-bg: rgba(20, 24, 33, 0.75);
    --glass-border: rgba(255, 255, 255, 0.1);
  }
}
```

- **Visual Excellence**:
  - Modern Google Fonts (e.g., *Inter*, *Outfit*, *Plus Jakarta Sans*).
  - Smooth glassmorphic containers (`backdrop-filter: blur(12px)`).
  - Interactive hover effects with subtle transforms (`transform: translateY(-3px)`).
  - High quality animations via CSS `@keyframes` and smooth transitions.

---

## 4. Modern JavaScript (ES6+)

- **DOM Interactions**: Use `querySelector` / `querySelectorAll` and delegate events when handling dynamic UI elements.
- **Clean Scoping**: Avoid polluting global scope with IIFEs or ES modules (`type="module"`).
- **Smooth Animations & Feedback**: Add active states, dark mode toggle handlers, scroll animations, and interactive feedback.

---

## 5. Quality Checklist

- [ ] Valid HTML5 structure with semantic elements.
- [ ] Fully responsive on Mobile, Tablet, and Desktop breakpoints.
- [ ] High visual polish: smooth gradients, cohesive color tokens, micro-interactions.
- [ ] No layout shifts or missing image alt attributes.
- [ ] Keyboard navigable with clear focus states (`:focus-visible`).
