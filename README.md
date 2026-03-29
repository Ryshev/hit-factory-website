# Hit Factory — Premium Cover Band Website

Website for **Hit Factory**, a premium cover band fronted by the ex-guitarist of Gradusy.

**Live:** https://hitfactory.band

## Features

- **Single-page design** — Hero, About (with embedded YouTube video), Gallery, Contact
- **Dark theme** with neon gradient accents (pink, purple, blue)
- **6 languages** with country-code URL slugs: `/ru/`, `/ua/`, `/ge/`, `/am/`, `/kz/`
- **SEO-optimized locales** — static HTML per language with hreflang, canonical, OG tags
- **Dynamic content** — admin edits (text + gallery) reflect on frontend instantly via `content.json`
- **Auto language detection** — .htaccess redirects by browser Accept-Language
- **Lazy-loaded YouTube** (lite-youtube facade — zero KB until click, pauses on tab switch)
- **Adaptive gallery** — CSS auto-fill grid adapts to any number of photos
- **Photo gallery** with lightbox (keyboard: arrows + Esc)
- **Scroll reveal** animations via IntersectionObserver
- **Responsive** — mobile hamburger menu, closes on outside click
- **SEO** — meta tags, Open Graph, Twitter Cards, JSON-LD, robots.txt, sitemap.xml
- **PHP admin panel** — works on shared hosting, no Node.js/database needed

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3 (custom properties, grid, flexbox), vanilla JS |
| Fonts | Oswald (Latin + Cyrillic), Noto Sans Georgian, Noto Sans Armenian |
| Images | AVIF format, optimized from HEIC/DNG originals |
| Admin backend | PHP 8.x (shared hosting compatible) |
| Auth | HMAC-signed cookies, bcrypt passwords, rate limiting |
| Build | Node.js scripts (locale generation, image conversion) |
| Hosting | Namecheap shared hosting (cPanel) |
| SSL | Let's Encrypt via acme.sh (auto-renewal via cron) |
| Deployment | SSH + SCP |

## Project Structure

```
site/                           # Production site (→ public_html on server)
├── index.html                  # English (root locale)
├── ru/index.html               # Russian
├── ua/index.html               # Ukrainian
├── ge/index.html               # Georgian
├── am/index.html               # Armenian
├── kz/index.html               # Kazakh
├── css/styles.css              # All styles
├── js/
│   ├── main.js                 # Lightbox, scroll reveal, YouTube, dynamic content
│   └── i18n.js                 # Translation strings (source of truth for build)
├── images/                     # Optimized AVIF photos + OG image
├── data/
│   └── content.json            # Dynamic content (written by admin, read by frontend)
├── favicon.svg                 # SVG favicon
├── robots.txt                  # Search engine directives
├── sitemap.xml                 # All locale URLs
├── .htaccess                   # HTTPS, language detection, old slug redirects, caching
├── hf-manage/                  # PHP admin panel
│   ├── index.html              # Login page (CAPTCHA + honeypot)
│   ├── dashboard.html          # Admin dashboard SPA
│   ├── api.php                 # REST API (auth, data, images)
│   ├── config.php              # Configuration (secrets, paths)
│   ├── .htaccess               # API routing, data protection
│   └── data/                   # JSON storage (users, site data, default translations)
└── admin/                      # Legacy Node.js admin (local dev only)

build-locales.js                # Generates static HTML per locale from i18n.js
admin-server.js                 # Node.js admin server (local development only)
.env / .env.example             # Environment config (git-ignored / template)
Mediafiles/                     # Original HEIC/DNG/video files (git-ignored)
```

## Content Architecture

```
i18n.js (translations)
    ↓ build-locales.js
Static HTML per locale (/ru/, /ua/, /ge/, etc.)
    ↓ served to browser
Frontend JS loads /data/content.json
    ↓ overrides static text with admin edits
User sees latest content
```

- **Static HTML** contains base translations (good for SEO, works without JS)
- **content.json** contains admin-edited content (text + gallery), loaded by JS on page load
- When admin saves → PHP writes `content.json` → frontend picks it up immediately

## Quick Start

### Local development

```bash
npm install
npx http-server site -p 8080    # Preview site
node admin-server.js            # Local admin panel (Node.js)
```

### Build locale pages

After editing translations in `site/js/i18n.js`:

```bash
node build-locales.js
```

### Deploy to production

```bash
# Full deploy
scp -r site/* hitfactory:~/public_html/

# Specific files
scp site/index.html hitfactory:~/public_html/
scp site/css/styles.css hitfactory:~/public_html/css/
scp site/js/main.js hitfactory:~/public_html/js/
scp -r site/ru site/ua site/ge site/am site/kz hitfactory:~/public_html/
```

SSH config (`~/.ssh/config`):
```
Host hitfactory
    HostName 198.177.120.183
    User hitfstmo
    IdentityFile ~/.ssh/id_hitfactory
    Port 21098
```

## Admin Panel

**URL:** https://hitfactory.band/hf-manage/

### What you can edit (changes appear on site immediately)

- **Translations** — all text on all 6 languages (tabbed by section: Hero, About, Nav, Gallery, Contact, Footer)
- **SEO** — page title, meta description per language; keywords, canonical, OG image (shared)
- **Gallery** — drag-and-drop reorder, upload new photos, delete, add from existing
- **Settings** — contacts, YouTube video ID, statistics
- **Admins** — add/remove users (superadmin only), change password, password reset

### How edits work

1. Edit text/gallery in admin → click **Save All**
2. PHP writes `/data/content.json` (public file)
3. Frontend JS loads `content.json` on page load → overrides static HTML
4. Changes visible immediately — no rebuild needed

### First login

On first access, initial admin account is created. Password saved to:
`hf-manage/data/initial_password.txt`

### Security

- HMAC-signed httpOnly cookies (4h expiry, strict SameSite)
- bcrypt password hashing (cost 12)
- File-based rate limiting (10 req / 15 min on auth endpoints)
- Honeypot + math CAPTCHA on login
- .htaccess blocks data directory
- noindex/nofollow on admin pages

## Locale System

### URL structure

| Language | URL Slug | hreflang | Label |
|----------|----------|----------|-------|
| English | `/` (root) | `en` | EN |
| Russian | `/ru/` | `ru` | RU |
| Ukrainian | `/ua/` | `uk` | UA |
| Georgian | `/ge/` | `ka` | GE |
| Armenian | `/am/` | `hy` | AM |
| Kazakh | `/kz/` | `kk` | KZ |

### How locales work

1. **i18n.js** — single source of all translation strings
2. **build-locales.js** — generates static HTML per locale with:
   - Translated `data-i18n` elements baked into HTML
   - Correct `<html lang>`, canonical, og:url, og:locale, og:title, og:description
   - hreflang tags linking all versions
   - Absolute asset paths for subdirectory pages
   - Active language highlighted in switcher
3. **content.json** — admin-edited translations override static HTML via JS
4. **.htaccess** — auto-detects browser language, 301 redirects old slugs

### Old slug redirects

```
/uk/ → /ua/ (301)
/ka/ → /ge/ (301)
/hy/ → /am/ (301)
/kk/ → /kz/ (301)
```

### Adding a new language

1. Add translation object in `site/js/i18n.js`
2. Add slug mapping in `build-locales.js` (`SLUG_MAP`)
3. Add `<a>` button in nav-lang div in `site/index.html`
4. Add font imports if needed (non-Latin scripts)
5. Run `node build-locales.js`
6. Update `site/sitemap.xml` and `.htaccess`
7. Export translations JSON: run the node export script
8. Deploy

## Image Pipeline

```bash
node convert-images.js    # DNG → PNG + AVIF
node convert-heic.js      # HEIC → PNG + AVIF (via heic-convert)
node optimize-images.js   # Resize to 1920px max, AVIF q80
```

| Stage | Format | Avg Size |
|-------|--------|----------|
| Original | HEIC/DNG | ~3.5 MB |
| Web-ready | AVIF (q80, 1920px max) | ~350 KB |
| OG Image | JPEG (1200×630) | ~140 KB |

## YouTube Video

Lite-youtube facade pattern — no iframe loaded until user clicks play.

- Pauses automatically when tab is switched (visibilitychange API)
- Pauses when scrolled out of viewport (IntersectionObserver)
- Uses `youtube-nocookie.com` for privacy
- Video ID configurable in admin → Settings → Video

## SSL

Let's Encrypt via acme.sh:
- Auto-renewal via cron (daily check at 8:54)
- Deployed to cPanel via `cpanel_uapi` hook
- Covers `hitfactory.band` + `www.hitfactory.band`

## Contacts

Configured in HTML and editable via admin:
- Two phone numbers with Telegram/WhatsApp icons (decorative)
- Email
- Instagram

## License

All rights reserved. Photos and content are property of Hit Factory.
