# Architecture Guide — Static Multilingual Site with PHP Admin

This document describes the architecture patterns used in this project.
Designed for reuse in similar projects: band sites, portfolio sites, landing pages.

## Overview

A fully static, SEO-optimized multilingual site with a PHP admin panel that works on any shared hosting (no Node.js, no database, no frameworks).

```
┌─────────────┐    ┌──────────────┐    ┌────────────────┐
│  i18n.js    │───►│ build-locales│───►│  /ru/index.html │
│ (translations)│  │    .js       │    │  /uk/index.html │
│             │    │              │    │  /ka/index.html │
│             │    │              │    │       ...       │
└─────────────┘    └──────────────┘    └────────────────┘
                                              │
                                              ▼
                                       ┌────────────┐
                                       │  Hosting    │
                                       │ public_html │
                                       └────────────┘
                                              │
                          ┌───────────────────┼───────────────┐
                          ▼                   ▼               ▼
                   ┌────────────┐    ┌──────────────┐  ┌───────────┐
                   │ Static site │   │ PHP Admin API │  │ .htaccess │
                   │  HTML/CSS/JS│   │  /hf-manage/  │  │ redirects │
                   └────────────┘    └──────────────┘  └───────────┘
```

## 1. Multilingual System

### Philosophy
- Translations stored in a single JS file (`i18n.js`)
- A build script generates static HTML for each locale
- Each locale gets its own URL (`/ru/`, `/ka/`, etc.)
- No client-side rendering of translations — content is in HTML

### Why static HTML per locale?
- Google indexes each language as a separate page
- No JavaScript needed to display content
- Faster load times (no translation lookup at runtime)
- Proper hreflang tags for SEO

### i18n.js structure
```javascript
const translations = {
  en: {
    'nav.home': 'Home',
    'hero.title': 'Welcome',
    // ...
  },
  ru: {
    'nav.home': 'Главная',
    'hero.title': 'Добро пожаловать',
    // ...
  }
};
```

### Build script pattern
```javascript
// 1. Read template (index.html)
// 2. Load translations from i18n.js
// 3. For each language:
//    a. Replace data-i18n elements with translated text
//    b. Set correct <html lang="">
//    c. Update canonical, og:url, og:locale
//    d. Fix asset paths (absolute for subdirectories)
//    e. Insert hreflang tags
//    f. Set active language in switcher
//    g. Write to /{lang}/index.html
```

### Asset paths
- Root locale (`/`): relative paths (`css/styles.css`)
- Subdirectory locales (`/ru/`): absolute paths (`/css/styles.css`)
- The build script converts relative → absolute for non-root locales

### Language detection (.htaccess)
```apache
# Auto-redirect root based on browser language
RewriteCond %{REQUEST_URI} ^/$
RewriteCond %{HTTP:Accept-Language} ^ru [NC]
RewriteRule ^$ /ru/ [R=302,L]
```
Uses 302 (not 301) so Google indexes all versions.

## 2. PHP Admin Panel

### Design principles
- No database — JSON files for storage
- No framework — single `api.php` handles all routes
- Works on any shared hosting with PHP 8.x
- Admin is a separate SPA that talks to REST API

### File structure
```
hf-manage/
├── index.html          # Login page
├── dashboard.html      # Admin SPA (fetches data via API)
├── api.php             # All REST endpoints
├── config.php          # Secrets, paths
├── .htaccess           # Route /api/* to api.php
└── data/
    ├── .htaccess       # Deny from all
    ├── users.json      # Admin users
    └── site-data.json  # Site content
```

### Authentication flow
```
Login form → POST /api/login → Verify bcrypt password
  → Create HMAC-signed token → Set httpOnly cookie
  → Redirect to dashboard.html

Dashboard → GET /api/me → Verify cookie token
  → If expired → Redirect to login
  → If valid → Load dashboard, fetch /api/data
```

### Token format
```
base64(JSON payload) + "." + HMAC-SHA256(payload, secret)
```
No external JWT library needed. PHP's `hash_hmac()` does the job.

### Rate limiting (file-based)
```php
// Store attempt timestamps in JSON file per IP+action
// Filter out attempts older than window
// Block if count exceeds max
```

### API routing (.htaccess)
```apache
RewriteRule ^api/(.*)$ api.php [QSA,L]
```
All `/api/*` requests go to `api.php`, which parses the path.

### Security checklist
- [x] bcrypt passwords (cost 12)
- [x] HMAC-signed httpOnly cookies
- [x] SameSite=Strict
- [x] Rate limiting on auth endpoints
- [x] Honeypot + CAPTCHA on login
- [x] Data directory blocked by .htaccess
- [x] Path traversal protection (basename)
- [x] noindex on admin pages
- [x] HTTPS enforced via .htaccess

## 3. Image Pipeline

### Converting from camera formats
```
HEIC/DNG → PNG (lossless intermediate) → AVIF (web-ready)
```

### Tools used
- `sharp` (Node.js) — handles DNG via dcraw, AVIF encoding
- `heic-convert` — pure JS HEIC decoder (sharp's libheif doesn't support HEIC)

### Optimization strategy
```javascript
sharp(input)
  .resize({ width: 1920, fit: 'inside', withoutEnlargement: true })
  .avif({ quality: 80, effort: 6 })
  .toFile(output);
```
- Max dimension: 1920px (sufficient for full-screen display)
- AVIF quality 80 (visually lossless, ~350KB average)
- OG image: JPEG 1200×630 (~140KB)

## 4. Lite YouTube Embed

### Pattern
```html
<div class="lite-youtube" data-videoid="VIDEO_ID">
  <div class="lite-youtube-poster" style="background-image: url('poster.avif')"></div>
  <button class="lite-youtube-playbtn">▶</button>
</div>
```

### JavaScript
```javascript
element.addEventListener('click', () => {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1';
  element.innerHTML = '';
  element.appendChild(iframe);
});
```

### Key details
- Zero network requests until click (no YouTube iframe/scripts loaded)
- Custom poster image (not YouTube thumbnail — better quality)
- `youtube-nocookie.com` for privacy
- `pointer-events: none` on poster/button so clicks reach the container

## 5. Deployment

### SSH setup for shared hosting
```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_project -N ""
# Import public key via cPanel → SSH Access → Import Key
# Import ONLY the public key, authorize it
```

SSH config:
```
Host projectname
    HostName IP_ADDRESS
    User cpanel_username
    IdentityFile ~/.ssh/id_project
    Port 21098        # Namecheap default SSH port
```

### Deploy command
```bash
scp -r site/* projectname:~/public_html/
```

### SSL via acme.sh
```bash
# Install
curl https://get.acme.sh | sh

# Set Let's Encrypt as default CA
~/.acme.sh/acme.sh --set-default-ca --server letsencrypt
~/.acme.sh/acme.sh --register-account -m email@example.com

# Issue certificate
~/.acme.sh/acme.sh --issue -d example.com -d www.example.com --webroot ~/public_html

# Deploy to cPanel
~/.acme.sh/acme.sh --deploy -d example.com --deploy-hook cpanel_uapi
```
Auto-renewal is set up via cron automatically.

## 6. .htaccess Essentials

```apache
# HTTPS redirect
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# Language auto-detection (302 not 301!)
RewriteCond %{REQUEST_URI} ^/$
RewriteCond %{HTTP:Accept-Language} ^ru [NC]
RewriteRule ^$ /ru/ [R=302,L]

# Block sensitive directories
RewriteRule ^admin/data/ - [F,L]

# Cache static assets
ExpiresByType image/avif "access plus 1 year"
ExpiresByType text/css "access plus 1 month"

# Gzip compression
AddOutputFilterByType DEFLATE text/html text/css application/javascript
```

## 7. Gallery with Lightbox

### CSS auto-fill grid
```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-rows: 300px;
  grid-auto-flow: dense;  /* Fill gaps automatically */
  gap: 8px;
}
```
This adapts to any number of photos without manual layout adjustment.

### Lightbox
Pure JS, no dependencies:
- Click image → show fullscreen overlay
- Keyboard: Escape to close, arrows to navigate
- Click outside image to close

## 8. Performance Checklist

- [x] AVIF images (5-10x smaller than JPEG)
- [x] Lazy loading on below-fold images (`loading="lazy"`)
- [x] YouTube facade (no iframe until click)
- [x] Google Fonts with `display=swap`
- [x] CSS/JS minification (manual, no build tool)
- [x] Gzip compression via .htaccess
- [x] Cache headers for static assets
- [x] No JavaScript frameworks (vanilla JS, ~5KB total)

## Reuse Checklist

To create a similar site for another project:

1. **Fork/copy** this repository
2. **Replace** images in `site/images/`
3. **Edit** translations in `site/js/i18n.js`
4. **Update** `site/index.html` — sections, content, contact info
5. **Update** `site/hf-manage/config.php` — secrets, admin email
6. **Run** `node build-locales.js` to generate locale pages
7. **Update** `site/sitemap.xml` with correct domain
8. **Deploy** to hosting via SCP
9. **Install SSL** via acme.sh
