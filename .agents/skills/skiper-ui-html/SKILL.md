---
name: skiper-ui-html
description: Guidelines, ready-to-use HTML/CSS/JS code templates, and implementations of Skiper UI-style advanced carousels (3D Perspective, Creative Depth, Card Stack Swipe, Inverted Coverflow, ClipPath) for static web pages without React or Tailwind dependencies. Use when creating modern, interactive sliders and 3D carousels in static HTML.
---

# Skiper UI HTML & Vanilla JS Implementation Skill

[Skiper UI](https://skiper-ui.com) is a component library known for high-impact, motion-rich carousels and sliders (originally built for React/shadcn). This skill enables pure static HTML, Vanilla CSS, and JavaScript implementations of Skiper UI components using **Swiper.js CDN** and CSS 3D Transforms.

---

## 1. Core Dependencies (CDN Script & Link)

Add Swiper.js to your `<head>` and before `</body>` in `index.html`:

```html
<!-- Swiper CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

---

## 2. Component Variations

### Variant 1: Creative 3D Depth Carousel (`skiper50` Equivalent)
*Depth effect with centered scaling, smooth opacity falloff, and shadow effects.*

#### HTML Structure
```html
<div class="skiper-container">
  <div class="swiper skiper-creative-slider">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="card-content">
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800" alt="Slide 1" />
          <div class="card-overlay">
            <h3>Creative Visual 01</h3>
            <p>Modern 3D Depth Effect</p>
          </div>
        </div>
      </div>
      <div class="swiper-slide">
        <div class="card-content">
          <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800" alt="Slide 2" />
          <div class="card-overlay">
            <h3>Creative Visual 02</h3>
            <p>Glassmorphism & Depth</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Navigation Buttons -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>
  </div>
</div>
```

#### CSS Styling
```css
.skiper-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.skiper-creative-slider {
  width: 100%;
  height: 480px;
  border-radius: 24px;
  overflow: visible;
}

.skiper-creative-slider .swiper-slide {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.card-content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: #fff;
}
```

#### JavaScript Initialization
```javascript
const creativeSwiper = new Swiper('.skiper-creative-slider', {
  effect: 'creative',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  creativeEffect: {
    prev: {
      shadow: true,
      translate: ['-125%', 0, -500],
      rotate: [0, 0, -15],
      opacity: 0.4,
    },
    next: {
      shadow: true,
      translate: ['125%', 0, -500],
      rotate: [0, 0, 15],
      opacity: 0.4,
    },
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
```

---

### Variant 2: Perspective 3D Coverflow (`skiper47` Equivalent)
*3D rotation and perspective depth for product cards or showcase galleries.*

```javascript
const coverflowSwiper = new Swiper('.skiper-coverflow-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 35,
    stretch: 0,
    depth: 250,
    modifier: 1,
    slideShadows: true,
  },
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
```

---

### Variant 3: Card Stack Swipe (`skiper48` Equivalent)
*Tinder-style or stacked cards swiping effect using Swiper Cards effect.*

```javascript
const cardsSwiper = new Swiper('.skiper-cards-slider', {
  effect: 'cards',
  grabCursor: true,
  perSlideRotate: 8,
  perSlideOffset: 12,
  cardsEffect: {
    slideShadows: true,
  },
});
```

---

### Variant 4: Clip-Path / Reveal Transition (`skiper54` Equivalent)
*Smooth clip-path expanding transition between slides.*

```css
/* CSS Clip Path Reveal Animation */
.skiper-clip-slide img {
  clip-path: circle(0% at 50% 50%);
  transition: clip-path 0.8s cubic-bezier(0.77, 0, 0.175, 1);
}

.swiper-slide-active .skiper-clip-slide img {
  clip-path: circle(100% at 50% 50%);
}
```

---

## 3. Best Practices Checklist
- [ ] Swiper.js CDN loaded properly in HTML head/body.
- [ ] CSS 3D transforms enabled (`perspective` and `transform-style: preserve-3d`).
- [ ] Responsive break-points configured via `breakpoints` option in Swiper.
- [ ] Touch gestures enabled with `grabCursor: true`.
- [ ] Smooth accessibility support with ARIA navigation buttons.
