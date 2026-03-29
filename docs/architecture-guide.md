# Architecture Guide — Static Multilingual Site with PHP Admin

Reusable patterns from this project: static multilingual site with dynamic admin on shared hosting.

## Overview

```
┌─────────────┐    ┌──────────────┐    ┌────────────────┐
│  i18n.js    │───►│ build-locales│───►│  /ru/index.html │
│(translations)│   │    .js       │    │  /ua/index.html │
└─────────────┘    └──────────────┘    │  /ge/index.html │
                                       └───────┬────────┘
                                               │
                   ┌──────────────┐    ┌───────▼────────┐
                   │  PHP Admin   │───►│ content.json   │
                   │  /hf-manage/ │    │ (public file)  │
                   └──────────────┘    └───────┬────────┘
                                               │
                                       ┌───────▼────────┐
                                       │  Frontend JS   │
                                       │ overrides HTML  │
                                       └────────────────┘
```

Two-layer content system:
1. **Static HTML** (from build) — base content, SEO-friendly, works without JS
2. **Dynamic JSON** (from admin) — overrides static content via JS on page load

## 1. Multilingual System

### URL slugs: country codes, not language codes

```javascript
// build-locales.js
const SLUG_MAP = { en: 'en', ru: 'ru', uk: 'ua', ka: 'ge', hy: 'am', kk: 'kz' };
```

hreflang uses ISO language codes (required by Google), URL slugs use country codes (user-friendly).

### Build script pattern

```javascript
// For each language:
// 1. Replace data-i18n elements with translated text
// 2. Set <html lang>, canonical, og:url, og:locale
// 3. Fix asset paths (absolute for subdirectory pages)
// 4. Insert hreflang tags
// 5. Set active language in nav switcher
// 6. Write to /{slug}/index.html
```

### i18n.js role

- **Build time**: source of translations for static HTML generation
- **Runtime**: NOT used to overwrite text (static HTML already translated)
- Only sets font classes for non-Latin scripts (Georgian, Armenian)

### content.json role

- Written by PHP admin on save
- Read by frontend JS on page load
- Overrides `data-i18n` elements with admin-edited text
- Contains: gallery list, translations, stats, contacts, video config

### Why this two-layer approach?

- SEO crawlers see translated text in HTML (no JS needed)
- Admin edits appear instantly without rebuild
- Site works even if JS fails (graceful degradation)
- No server-side rendering needed

## 2. PHP Admin Panel

### No database, no framework

```
hf-manage/
├── index.html          # Login (honeypot + math CAPTCHA)
├── dashboard.html      # SPA dashboard
├── api.php             # All REST endpoints (single file router)
├── config.php          # Secrets, paths
├── .htaccess           # Route /api/* to api.php, block /data/
└── data/
    ├── users.json              # Admin accounts (bcrypt hashed)
    ├── site-data.json          # Full admin data
    ├── translations-default.json # Exported from i18n.js for initial load
    └── .htaccess               # Deny from all
```

### Authentication

```
HMAC-SHA256 signed cookie token (not JWT library — just hash_hmac)
Token = base64(payload) + "." + HMAC(payload, secret)
4-hour expiry, httpOnly, SameSite=Strict
```

### Public content endpoint

On save, PHP writes TWO files:
1. `data/site-data.json` — full admin data (protected)
2. `data/content.json` — public subset (gallery, translations, stats)

Frontend only reads the public file.

### Default translations loading

On first run (no site-data.json), PHP loads `translations-default.json` which is pre-exported from `i18n.js` via Node.js:

```bash
node -e "...parse i18n.js..." > site/hf-manage/data/translations-default.json
```

## 3. Gallery System

### CSS: auto-fill grid

```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  gap: 8px;
}
```

Adapts to any number of photos — no JS layout logic needed.

### Dynamic loading

```javascript
// Frontend loads gallery from content.json
const data = await fetch('/data/content.json').then(r => r.json());
galleryGrid.innerHTML = data.gallery.map(src =>
  `<div class="gallery-item"><img src="/${src}">...</div>`
).join('');
```

### Admin gallery

- Drag-and-drop reorder (HTML5 Drag API)
- Upload via drag-drop zone or file picker (multer on Node.js / move_uploaded_file on PHP)
- Delete photos
- Add from existing server images

## 4. YouTube Embed (Lite Pattern)

```html
<div class="lite-youtube" data-videoid="VIDEO_ID">
  <div class="lite-youtube-poster" style="background-image:url('poster.avif')"></div>
  <button class="lite-youtube-playbtn">▶</button>
</div>
```

Key details:
- `pointer-events: none` on poster/button — clicks reach container div
- `enablejsapi=1` in iframe URL — enables postMessage control
- `youtube-nocookie.com` for privacy
- Pause on `visibilitychange` (tab switch)
- Pause on `IntersectionObserver` (scroll out of viewport)

## 5. Deployment (Shared Hosting)

### SSH on Namecheap

```
Port: 21098 (not 22)
SSH Access must be enabled in cPanel
Import public key via cPanel → SSH Access → Import Key → Authorize
```

### SSL via acme.sh

```bash
~/.acme.sh/acme.sh --set-default-ca --server letsencrypt
~/.acme.sh/acme.sh --register-account -m email@example.com
~/.acme.sh/acme.sh --issue -d domain.com --webroot ~/public_html
~/.acme.sh/acme.sh --deploy -d domain.com --deploy-hook cpanel_uapi
# Auto-renewal via cron — set up automatically
```

### .htaccess essentials

```apache
# HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# Old slug redirects (301 for SEO)
RewriteRule ^uk/(.*)$ /ua/$1 [R=301,L]

# Language detection (302 — don't cache)
RewriteCond %{REQUEST_URI} ^/$
RewriteCond %{HTTP:Accept-Language} ^ru [NC]
RewriteRule ^$ /ru/ [R=302,L]

# Caching + compression
ExpiresByType image/avif "access plus 1 year"
AddOutputFilterByType DEFLATE text/html text/css application/javascript
```

## 6. Performance

- AVIF images (5-10x smaller than JPEG)
- Lazy loading (`loading="lazy"`)
- YouTube facade (zero KB until click)
- Google Fonts with `display=swap`
- Gzip compression + cache headers
- No JavaScript frameworks (~5KB total JS)

## 7. Reuse Checklist

1. Fork repository
2. Replace images in `site/images/`
3. Edit translations in `site/js/i18n.js`
4. Update `site/index.html` — sections, contacts
5. Update `site/hf-manage/config.php` — secrets, admin email
6. Update `SLUG_MAP` in `build-locales.js` if different locales
7. Run `node build-locales.js`
8. Export translations: `node -e "..." > translations-default.json`
9. Update `sitemap.xml` with correct domain
10. Deploy via SCP, install SSL via acme.sh
