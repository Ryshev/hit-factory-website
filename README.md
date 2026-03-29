# Hit Factory — Premium Cover Band Website

Website for **Hit Factory**, a premium cover band fronted by the guitarist of Gradusy.

## Features

- **Single-page design** — Hero, About, Gallery, Video, Contact sections
- **Dark theme** with neon gradient accents (pink, purple, blue)
- **6 languages** — English, Russian, Ukrainian, Georgian, Armenian, Kazakh
- **Auto language detection** — picks browser language, user can override
- **Lazy-loaded YouTube** embed (lite-youtube facade — no iframe until click)
- **Photo gallery** with lightbox (keyboard navigation: arrows + Esc)
- **Scroll reveal** animations via IntersectionObserver
- **Responsive** — mobile hamburger menu, adaptive grid layouts
- **SEO optimized** — meta tags, Open Graph, Twitter Cards, JSON-LD, robots.txt, sitemap.xml
- **Admin panel** — protected by authentication, edit content/translations/SEO/gallery

## Security

- **JWT authentication** with httpOnly cookies (HS256, 4h expiry, strict SameSite)
- **Password hashing** via bcrypt (12 rounds)
- **Rate limiting** on login, password reset, password change (10 req / 15 min)
- **Helmet** HTTP security headers
- **Honeypot field** + math CAPTCHA on login form
- **Path traversal protection** on file operations (path.basename)
- **Admin URL obfuscation** — non-guessable slug instead of `/admin`
- **Role-based access** — superadmin can manage other admins
- **Password reset** via email with expiring tokens (1 hour)
- **noindex, nofollow** on admin pages

## Tech Stack

- HTML5, CSS3, vanilla JavaScript (no frameworks, no build step)
- Node.js + Express (admin server)
- [Oswald](https://fonts.google.com/specimen/Oswald) font (Latin + Cyrillic)
- [Noto Sans Georgian/Armenian](https://fonts.google.com/) for non-Latin scripts
- AVIF images (optimized from HEIC/DNG originals)
- bcryptjs, jsonwebtoken, nodemailer, helmet, express-rate-limit, multer

## Project Structure

```
site/
  index.html              Main website
  css/styles.css           All styles
  js/
    main.js                Core functionality (nav, lightbox, scroll, YouTube)
    i18n.js                Translations for 6 languages + auto-detection
  images/                  Optimized AVIF photos
  robots.txt               Search engine directives
  sitemap.xml              Sitemap with hreflang
  admin/
    login.html             Login page (honeypot + CAPTCHA)
    index.html             Admin dashboard
    data/                  JSON storage (git-ignored)

admin-server.js            Express server with auth + API
.env                       Environment config (git-ignored)
Mediafiles/                Original media (git-ignored)
```

## Quick Start

### 1. Configure environment

```bash
cp .env.example .env
# Edit .env — set JWT_SECRET (required), SMTP credentials (optional)
```

### 2. Install and run

```bash
npm install
node admin-server.js
```

On first run, an initial admin account is created and the password is printed to the console. **Change it immediately after first login.**

### 3. Access

- **Site:** http://localhost:3000/
- **Admin panel:** http://localhost:3000/hf-manage

### 4. SMTP Configuration (for password reset emails)

Set in `.env`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@hitfactory.band
```

If SMTP is not configured, password reset links are printed to the server console.

## Admin Panel

### Structure

The admin sidebar is organized by language. Click a language to edit all its translations, organized by tabs:
- **Hero** — subtitle, description, CTA button text
- **About** — headings, body text, stat labels
- **Navigation** — menu item labels
- **Gallery & Video** — section titles
- **Contact** — section titles and labels
- **Footer** — copyright text
- **SEO** — title, description, keywords, canonical URL, OG image

Additional pages:
- **Gallery** — drag-and-drop reordering, upload new photos, delete, add from existing
- **Settings** — contact info, YouTube video ID, statistics
- **Admins** (superadmin only) — add/remove admin users, change password

### Roles

| Role | Permissions |
|------|-------------|
| superadmin | Full access + manage other admins |
| admin | Edit content, translations, gallery, settings |

## Image Pipeline

Original photos (HEIC/DNG) are not tracked in git. To re-convert:

```bash
node convert-images.js    # DNG -> PNG + AVIF
node convert-heic.js      # HEIC -> PNG + AVIF
node optimize-images.js   # Resize to 1920px max, re-encode AVIF
```

| Stage | Format | Avg Size |
|-------|--------|----------|
| Original | HEIC/DNG | ~3.5 MB |
| Web-ready | AVIF (q80, max 1920px) | ~350 KB |

## Adding a New Language

1. Add translation object in `site/js/i18n.js`
2. Add language button in `<div class="nav-lang">` in `index.html`
3. Add font imports if needed (non-Latin scripts)
4. Add `og:locale:alternate` meta tag
5. The admin panel auto-detects available languages

## License

All rights reserved. Photos and content are property of Hit Factory.
