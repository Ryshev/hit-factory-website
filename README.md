# Hit Factory — Premium Cover Band Website

Website for **Hit Factory**, a premium cover band fronted by the ex-guitarist of Gradusy.

**Live:** https://hitfactory.band

## Features

- **Single-page design** — Hero, About (with embedded video), Gallery, Contact
- **Dark theme** with neon gradient accents (pink, purple, blue)
- **6 languages** — EN, RU, UK, KA, HY, KK with URL-based locales (`/ru/`, `/uk/`, etc.)
- **SEO-optimized locales** — each language has its own static HTML with hreflang, canonical, OG tags
- **Auto language detection** — redirects by browser Accept-Language header via .htaccess
- **Lazy-loaded YouTube** embed (lite-youtube facade — zero KB until click)
- **Photo gallery** with lightbox (keyboard navigation: arrows + Esc)
- **Scroll reveal** animations via IntersectionObserver
- **Responsive** — mobile hamburger menu, adaptive gallery grid
- **SEO** — meta tags, Open Graph, Twitter Cards, JSON-LD, robots.txt, sitemap.xml
- **PHP admin panel** — protected by auth, works on shared hosting

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3 (custom properties, grid, flexbox), vanilla JS |
| Fonts | Oswald (Latin + Cyrillic), Noto Sans Georgian, Noto Sans Armenian |
| Images | AVIF format, optimized from HEIC/DNG originals |
| Admin backend | PHP 8.x (runs on shared hosting, no Node.js needed) |
| Auth | HMAC-signed cookies, bcrypt passwords, rate limiting |
| Hosting | Namecheap shared hosting (cPanel) |
| SSL | Let's Encrypt via acme.sh (auto-renewal via cron) |
| Deployment | SSH + SCP |

## Project Structure

```
site/                           # Production site root (→ public_html)
├── index.html                  # English (root locale)
├── ru/index.html               # Russian locale
├── uk/index.html               # Ukrainian locale
├── ka/index.html               # Georgian locale
├── hy/index.html               # Armenian locale
├── kk/index.html               # Kazakh locale
├── css/styles.css              # All styles
├── js/
│   ├── main.js                 # Lightbox, scroll reveal, YouTube, nav
│   └── i18n.js                 # Translation strings (source of truth)
├── images/                     # Optimized AVIF photos + OG image
├── favicon.svg                 # SVG favicon (HF gradient)
├── robots.txt                  # Search engine directives
├── sitemap.xml                 # Sitemap with all locale URLs
├── .htaccess                   # HTTPS redirect, language detection, caching, gzip
├── hf-manage/                  # PHP admin panel
│   ├── index.html              # Login page (CAPTCHA + honeypot)
│   ├── dashboard.html          # Admin dashboard SPA
│   ├── api.php                 # REST API (auth, data, images)
│   ├── config.php              # Configuration (secrets, paths)
│   ├── .htaccess               # API routing, data protection
│   └── data/                   # JSON storage (git-ignored)
│       ├── users.json          # Admin users (hashed passwords)
│       ├── site-data.json      # Site content data
│       └── .htaccess           # Deny all access
└── admin/                      # Legacy Node.js admin (local dev only)

admin-server.js                 # Node.js admin server (local development)
build-locales.js                # Static page generator for all locales
.env                            # Environment config (git-ignored)
.env.example                    # Environment template
Mediafiles/                     # Original media files (git-ignored)
```

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
node build-locales.js           # Generates /ru/, /uk/, /ka/, /hy/, /kk/
```

### Deploy to production

```bash
# Deploy all site files
scp -r site/* hitfactory:~/public_html/

# Or deploy specific changes
scp site/index.html hitfactory:~/public_html/
scp site/css/styles.css hitfactory:~/public_html/css/
scp -r site/ru site/uk site/ka site/hy site/kk hitfactory:~/public_html/
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

### Features
- Edit translations for all 6 languages (tabbed by section)
- SEO settings: title, description, keywords, canonical, OG image (visual upload)
- Gallery: drag-and-drop reorder, upload, delete, add from existing
- Settings: contacts, YouTube video ID, statistics
- Admin users: add/remove (superadmin only), change password
- Password reset via email or server log

### Architecture
- Pure PHP backend — works on any shared hosting with PHP 8.x
- No database — JSON file storage
- HMAC-signed httpOnly cookies for sessions (4h expiry)
- bcrypt password hashing (cost 12)
- File-based rate limiting (10 req / 15 min on auth endpoints)
- Honeypot + math CAPTCHA on login
- .htaccess protects data directory from direct access

### First Login
On first access, an initial admin account is created. Password is saved to:
`hf-manage/data/initial_password.txt`

## Locale System

### How it works
1. **Source of truth:** `site/js/i18n.js` contains all translations
2. **Build step:** `node build-locales.js` generates static HTML for each language
3. **Each locale page** has translated text baked into HTML (no JS needed for content)
4. **Language switcher** uses `<a>` links to locale URLs (not JS switching)
5. **.htaccess** auto-redirects root `/` based on browser Accept-Language

### URL structure
| Language | URL | hreflang |
|----------|-----|----------|
| English (default) | `/` | `en` |
| Russian | `/ru/` | `ru` |
| Ukrainian | `/uk/` | `uk` |
| Georgian | `/ka/` | `ka` |
| Armenian | `/hy/` | `hy` |
| Kazakh | `/kk/` | `kk` |

### Adding a new language
1. Add translation object in `site/js/i18n.js`
2. Add `<a>` button in the `nav-lang` div in `site/index.html`
3. Add font imports if needed (non-Latin scripts)
4. Run `node build-locales.js`
5. Update `site/sitemap.xml`
6. Deploy

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

## SSL

Let's Encrypt certificate installed via acme.sh:
- Auto-renewal via cron (daily check)
- Deployed to cPanel via `cpanel_uapi` hook
- Covers `hitfactory.band` + `www.hitfactory.band`

## Security

- HMAC-signed session cookies (httpOnly, strict SameSite, secure in production)
- bcrypt password hashing (cost 12)
- Rate limiting on auth endpoints
- Honeypot + CAPTCHA on login
- .htaccess blocks data directory access
- noindex/nofollow on admin pages
- Path traversal protection on file operations
- Admin URL obfuscation (`/hf-manage/` not `/admin/`)

## License

All rights reserved. Photos and content are property of Hit Factory.
