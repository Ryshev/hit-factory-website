# Hit Factory — Cover Band Website

Professional website for **Hit Factory**, a cover band delivering unforgettable live performances.

## Features

- **Single-page design** — Hero, About, Gallery, Video, Contact sections
- **Dark theme** with neon gradient accents (pink → purple → blue)
- **6 languages** — English, Russian, Ukrainian, Georgian, Armenian, Kazakh
- **Lazy-loaded YouTube** embed (lite-youtube facade pattern — no iframe until click)
- **Photo gallery** with lightbox (keyboard navigation: arrows + Esc)
- **Scroll reveal** animations via IntersectionObserver
- **Responsive** — mobile hamburger menu, adaptive grid layouts
- **SEO optimized** — meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- **Admin panel** — edit content, translations, SEO/OG, gallery, contacts, video

## Tech Stack

- HTML5, CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (no frameworks, no build step)
- [Oswald](https://fonts.google.com/specimen/Oswald) font (Latin + Cyrillic)
- [Noto Sans Georgian/Armenian](https://fonts.google.com/) for non-Latin scripts
- AVIF images (optimized from HEIC/DNG originals)
- Node.js + Express for admin panel backend

## Project Structure

```
site/
├── index.html          # Main website
├── css/styles.css      # All styles
├── js/
│   ├── main.js         # Core functionality (nav, lightbox, scroll, YouTube)
│   └── i18n.js         # Translations for 6 languages
├── images/             # Optimized AVIF photos
└── admin/
    ├── index.html      # Admin panel UI
    └── data/           # JSON data storage

admin-server.js         # Express server for admin API
Mediafiles/
├── Heic/               # Original HEIC/DNG photos (git-ignored)
├── Video/              # Promo videos (git-ignored)
├── png/                # Intermediate PNG conversions (git-ignored)
├── avif/               # First AVIF pass (git-ignored)
└── avif-optimized/     # Final optimized AVIF (git-ignored)
```

## Quick Start

### View the website

Open `site/index.html` directly in a browser, or serve it:

```bash
npx http-server site -p 8080
```

### Admin panel

```bash
npm install
node admin-server.js
```

Then open:
- **Admin panel**: http://localhost:3000/admin
- **Site preview**: http://localhost:3000/

### Image conversion

Original photos (HEIC/DNG) are not tracked in git. To re-convert:

```bash
node convert-images.js    # DNG → PNG + AVIF
node convert-heic.js      # HEIC → PNG + AVIF
node optimize-images.js   # Resize to 1920px max, re-encode AVIF
```

## Configuration

### YouTube Video

1. Upload video to YouTube
2. Copy the video ID from the URL (e.g., `dQw4w9WgXcQ`)
3. Either:
   - Set it in the admin panel → Video → YouTube Video ID
   - Or edit `data-videoid` attribute in `site/index.html`

### Contacts

Update in admin panel or directly in `site/index.html`:
- Phone number and tel: link
- Email address
- Instagram handle and URL

### Adding a new language

1. Add translation object in `site/js/i18n.js`
2. Add language button in the nav `<div class="nav-lang">` section
3. Add font imports if needed (for non-Latin scripts)
4. Add `og:locale:alternate` meta tag in `<head>`

## Fonts

| Script | Font | Fallback |
|--------|------|----------|
| Latin, Cyrillic | Oswald | sans-serif |
| Georgian | Noto Sans Georgian | Oswald |
| Armenian | Noto Sans Armenian | Oswald |

## Image Pipeline

Original photos → PNG (lossless) → AVIF (quality 80, max 1920px)

| Stage | Format | Avg Size |
|-------|--------|----------|
| Original | HEIC/DNG | ~3.5 MB |
| Intermediate | PNG | ~11 MB |
| Web-ready | AVIF | ~350 KB |

## Browser Support

- Chrome 85+, Firefox 93+, Safari 16.4+, Edge 85+ (AVIF support)
- Graceful degradation for older browsers via `<picture>` element

## License

All rights reserved. Photos and content are property of Hit Factory.
