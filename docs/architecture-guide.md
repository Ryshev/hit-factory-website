# Architecture Guide — Static Multilingual Site with PHP Admin

Reusable patterns from this project: static multilingual site with dynamic admin panel on shared hosting. No frameworks, no database, no build tools beyond Node.js scripts.

## Overview

```
                    BUILD TIME                          RUNTIME
                    ─────────                          ───────
i18n.js ──► build-locales.js ──► Static HTML      ◄── content.json ◄── PHP Admin
            (translations)       (SEO-friendly)       (dynamic edits)

Static HTML = base layer (crawlers, no-JS fallback)
content.json = dynamic layer (admin edits, instant updates)
```

## 1. Two-Layer Content System

### Why two layers?

| Layer | Written by | Read by | Purpose |
|-------|-----------|---------|---------|
| Static HTML | Build script | Crawlers + browsers | SEO, no-JS fallback |
| content.json | PHP admin | Frontend JS | Instant admin edits |

### What admin can change (no rebuild):
- All text on all languages
- Gallery (photos, order)
- Custom code injection (analytics, meta tags)

### What requires rebuild + deploy:
- Adding/removing languages
- HTML structure changes
- Static meta tags (Google verification, Analytics)

## 2. Multilingual System

### URL slugs: country codes

```javascript
const SLUG_MAP = { en: 'en', ru: 'ru', uk: 'ua', ka: 'ge', hy: 'am', kk: 'kz' };
```

hreflang uses ISO language codes (Google requirement), URLs use country codes (user-friendly).

### Build script flow

```
For each language:
  1. Replace data-i18n elements → translated text in HTML
  2. Set <html lang>, canonical, og:url, og:locale, og:title, og:description
  3. Fix asset paths → absolute /paths for subdirectory locales
  4. Insert hreflang tags, remove old ones
  5. Set active language in nav switcher
  6. Write to /{slug}/index.html
```

### i18n.js — build time only

At runtime, i18n.js does NOT overwrite text (static HTML already translated). It only:
- Sets font classes for non-Latin scripts (Georgian, Armenian)
- Sets footer year

### content.json — runtime override

Frontend JS loads `/data/content.json` and:
- Overrides `data-i18n` elements with admin-edited translations
- Rebuilds gallery from admin photo list
- Injects custom head/footer code

### Old slug redirects (.htaccess)

```apache
RewriteRule ^uk/(.*)$ /ua/$1 [R=301,L]
RewriteRule ^ka/(.*)$ /ge/$1 [R=301,L]
```

301 redirects preserve SEO when changing URL structure.

### Language auto-detection

```apache
RewriteCond %{REQUEST_URI} ^/$
RewriteCond %{HTTP:Accept-Language} ^ru [NC]
RewriteRule ^$ /ru/ [R=302,L]
```

302 (not 301) so Google indexes all versions, not just the redirected one.

## 3. PHP Admin Panel

### Architecture: single-file API

```
hf-manage/
├── index.html          # Login (honeypot + math CAPTCHA)
├── dashboard.html      # SPA (vanilla JS, fetches from api.php)
├── api.php             # All endpoints in one file (router by path)
├── config.php          # AUTH_SECRET, SMTP, paths
├── .htaccess           # Route /api/* → api.php, block /data/
└── data/
    ├── users.json              # Accounts (bcrypt cost 12)
    ├── site-data.json          # Full data (private)
    ├── translations-default.json # From i18n.js (initial load)
    └── .htaccess               # Deny from all
```

### Auth: HMAC-signed cookies (no JWT library)

```php
$data = base64_encode(json_encode($payload));
$sig = hash_hmac('sha256', $data, AUTH_SECRET);
$token = $data . '.' . $sig;
// Set as httpOnly, SameSite=Strict, 4h expiry
```

### Save flow: two files written

```php
// Private — full admin data
file_put_contents(SITE_DATA_FILE, json_encode($input));

// Public — subset for frontend
$public = [
    'gallery' => ..., 'translations' => ...,
    'customHeadCode' => ..., 'customFooterCode' => ...
];
file_put_contents('data/content.json', json_encode($public));
```

### Rate limiting (file-based)

```php
// Store timestamps per IP+action in JSON file
// Filter out entries older than window (15 min)
// Block if count >= max (10)
```

### Default translations loading

On first run (no site-data.json), PHP loads `translations-default.json` — pre-exported from i18n.js:

```bash
node -e "
const fs = require('fs');
const src = fs.readFileSync('site/js/i18n.js', 'utf8');
const match = src.match(/const translations\s*=\s*(\{[\s\S]*?\n\};)/);
const obj = new Function('return ' + match[1].replace(/;$/, ''))();
fs.writeFileSync('translations-default.json', JSON.stringify(obj, null, 2));
"
```

### Admin sidebar structure

```
Languages (per-locale editing):
  🇬🇧 English → tabs: Hero | About | Nav | Gallery & Video | Contact | Footer | SEO
  🇷🇺 Russian → same tabs, Russian text
  ... (6 languages)

Site-wide:
  Gallery     → drag-and-drop, upload, delete
  Settings    → Contact | Video | Statistics | Code Injection
  Admins      → user management (superadmin only)
```

### Code Injection

Admin can add arbitrary HTML to head and footer via Settings → Code Injection.
Injected by frontend JS from content.json (not static HTML).

**Important:** For Google verification and Analytics, put in static HTML template instead — crawlers don't execute JS reliably.

## 4. Gallery System

### Varied grid layout (JS-driven)

```javascript
const GRID_COLS = 6;
const ROW_PATTERNS = [[3,3], [2,2,2], [2,4], [4,2], [3,3], [2,2,2]];

// Last row: distribute remaining items evenly across 6 columns
const base = Math.floor(GRID_COLS / remaining);
let extra = GRID_COLS % remaining;
```

Guarantees every row fills all 6 columns, with varied item widths.

### CSS

```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 280px;
  gap: 8px;
}
/* JS sets: item.style.gridColumn = 'span X' */
```

### Responsive (CSS media queries)

```
Desktop: repeat(6, 1fr) — JS assigns patterns
Tablet:  repeat(4, 1fr) — JS patterns adapt
Mobile:  repeat(2, 1fr) — all items span 1
```

## 5. YouTube Embed (Lite Pattern)

```html
<div class="lite-youtube" data-videoid="ID">
  <div class="lite-youtube-poster" style="background-image:url(poster.avif)"></div>
  <button class="lite-youtube-playbtn">▶</button>
</div>
```

- `pointer-events: none` on children — clicks reach container
- `enablejsapi=1` — allows postMessage pause/play
- Pause on `visibilitychange` (tab switch)
- Pause via `IntersectionObserver` (scroll away)
- `youtube-nocookie.com` for GDPR

## 6. Responsive Design Patterns

### Fluid typography (no breakpoint needed)

```css
font-size: clamp(60px, 15vw, 180px);    /* Hero title */
letter-spacing: clamp(4px, 1.5vw, 12px); /* Adapts with screen */
padding: 0 clamp(16px, 4vw, 24px);       /* Container padding */
```

### Fluid sizing: always use clamp(), never fixed px

**Rule:** All font sizes, spacings, paddings that vary by screen — use `clamp(min, preferred, max)` from the start. Never hardcode `px` values that need media query overrides later.

```css
/* Good — fluid, no breakpoints needed */
font-size: clamp(52px, 18vw, 180px);
letter-spacing: clamp(2px, 1vw, 12px);
padding: 0 clamp(16px, 4vw, 24px);

/* Bad — requires multiple @media to fix */
font-size: 180px;
@media (max-width: 768px) { font-size: 80px; }
@media (max-width: 480px) { font-size: 48px; }
```

**Why:** Fixed `px` values create discrete jumps between breakpoints. `clamp()` scales smoothly across all screen sizes. Easier to maintain — one line instead of multiple media queries. Especially important for multilingual sites where text length varies by language.

**Units priority:**
- `clamp()` with `vw` for fluid scaling (headings, hero text, spacing)
- `rem` for consistent sizing relative to root font-size (body text, margins, paddings)
- `px` only for borders, shadows, and tiny fixed values (1px, 2px)
- Never `px` for font sizes or layout spacing — always `rem` or `clamp()`

**Where to apply:**
- Hero title, subtitles, section headings
- Letter-spacing (long text with wide spacing overflows on mobile)
- Container padding (tighter on mobile, wider on desktop)
- Nav logo size
- Any spacing that "breaks" on small screens

### Multilingual text overflow prevention

```css
body {
  overflow-wrap: break-word;
  word-break: break-word;
  overflow-x: hidden;
}
```

Languages like Armenian and Georgian have long words that can overflow containers on mobile. `break-word` forces wrapping. Applied globally — safe for all languages (only breaks words that would overflow).

### Animated gradient text

```css
.accent {
  background: linear-gradient(90deg, pink, purple, blue, pink);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  animation: gradientShift 5s ease-in-out infinite;
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### Seamless section transitions

```css
/* Hero overlay ends at exact color of next section */
linear-gradient(180deg, ..., var(--color-surface) 100%)
```

## 7. Deployment (Shared Hosting)

### SSH on Namecheap

- Port: **21098** (not 22)
- Enable SSH in cPanel → SSH Access
- Import public key only → Authorize

### SSL via acme.sh

```bash
curl https://get.acme.sh | sh
~/.acme.sh/acme.sh --set-default-ca --server letsencrypt
~/.acme.sh/acme.sh --register-account -m email@example.com
~/.acme.sh/acme.sh --issue -d domain.com -d www.domain.com --webroot ~/public_html
~/.acme.sh/acme.sh --deploy -d domain.com --deploy-hook cpanel_uapi
```

Auto-renewal via cron (set up automatically by acme.sh).

### .htaccess essentials

```apache
# HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# Old slug redirects
RewriteRule ^uk/(.*)$ /ua/$1 [R=301,L]

# Language detection (302!)
RewriteCond %{REQUEST_URI} ^/$
RewriteCond %{HTTP:Accept-Language} ^ru [NC]
RewriteRule ^$ /ru/ [R=302,L]

# Caching
ExpiresByType image/avif "access plus 1 year"

# Compression
AddOutputFilterByType DEFLATE text/html text/css application/javascript
```

## 8. Schema.org Structured Data

Three JSON-LD schemas per page:

```json
[{
  "@type": "MusicGroup",     // Band: genres, members, languages, booking offer
  "areaServed": ["Georgia", "Armenia", "Kazakhstan", "Europe", "International"]
},
{
  "@type": "EntertainmentBusiness",  // Local search: address, priceRange
  "address": { "addressCountry": "GE", "addressLocality": "Tbilisi" }
},
{
  "@type": "WebSite",        // Site: languages, booking action
  "inLanguage": ["en", "ru", "uk", "ka", "hy", "kk"]
}]
```

## 9. Cache Busting

Build script replaces `?v=` on CSS/JS files:
```javascript
html = html.replace(/styles\.css(\?v=[^"]*)?/g, `styles.css?v=${VERSION}`);
// VERSION = YYYYMMDD-HHMM from build timestamp
```

Uses replace (not append) — prevents `?v=1?v=2?v=3` duplication.

## 10. Language Cookie

When user visits any page, JS sets `hf-locale` cookie:
```javascript
document.cookie = 'hf-locale=' + lang + ';path=/;max-age=31536000;SameSite=Lax';
```

`.htaccess` checks this cookie before auto-redirecting:
```apache
RewriteCond %{HTTP_COOKIE} !hf-locale=
RewriteRule ^$ /ru/ [R=302,L]
```

This prevents redirect loops when a Russian-speaking user clicks EN.

## 11. Security Checklist

- [x] HMAC-signed httpOnly cookies (not localStorage)
- [x] Cryptographically random AUTH_SECRET (48 bytes)
- [x] bcrypt passwords (cost 12)
- [x] SameSite=Strict cookies, 2h expiry
- [x] Rate limiting on auth + data save endpoints
- [x] Honeypot + CAPTCHA on login
- [x] MIME type validation on file uploads (finfo)
- [x] Gallery img src regex whitelist
- [x] X-Frame-Options: DENY, X-Content-Type-Options: nosniff
- [x] No-cache headers on admin pages
- [x] Data directory blocked by .htaccess
- [x] noindex/nofollow on admin pages
- [x] Path traversal protection (basename)
- [x] Cannot delete last superadmin
- [x] Initial password auto-deleted after first login
- [x] Old slug 301 redirects (SEO preservation)
- [x] Google verification in static HTML (not JS)

## 12. Reuse Checklist

1. Fork/copy this repository
2. Replace images in `site/images/`
3. Edit translations in `site/js/i18n.js`
4. Update `site/index.html` — sections, contacts, structure
5. Update `SLUG_MAP` in `build-locales.js`
6. Update `site/hf-manage/config.php` — AUTH_SECRET, admin email
7. Run `node build-locales.js`
8. Export translations JSON for admin
9. Update `sitemap.xml`, `.htaccess` with correct domain/slugs
10. Deploy via SCP, install SSL via acme.sh

## 13. Admin Panel v2 — Page-Based Architecture (for future projects)

The Hit Factory admin uses a **language-first** sidebar: pick a language, then edit all sections. This works for a single-page site, but for multi-page sites a **page-first** approach (like WordPress + Polylang) is better.

### Current approach (Hit Factory)

```
Sidebar: EN | RU | UA | GE | AM | KZ → tabs: Hero | About | Gallery | Contact | SEO
```

Works for: single-page sites, landing pages, simple portfolios.
Limitation: all content is flat — no concept of "pages".

### Recommended approach for future projects

```
Sidebar:
  Pages
    ├── Home          → click → locale tabs: EN | RU | UA | ... → fields for this page
    ├── About         → click → locale tabs: EN | RU | UA | ... → fields for this page
    ├── Services      → click → locale tabs: EN | RU | UA | ...
    └── Contact       → click → locale tabs: EN | RU | UA | ...
  Options
    ├── Header        → locale tabs → logo, nav items, CTA button text
    └── Footer        → locale tabs → copyright, social links, address
  Gallery             → drag-and-drop photos (shared across locales)
  Code Injection      → head code, footer code (global, no locales)
  SEO                 → per-page, per-locale: title, description, OG image
  Admins              → user management
```

### Key differences from current approach

| Aspect | Current (Hit Factory) | Recommended v2 |
|--------|----------------------|----------------|
| Navigation | Language-first | Page-first |
| Content scope | All content flat | Per-page content |
| Shared elements | Mixed with page content | Separate Options section (Header, Footer) |
| SEO | Per-locale tab on each language | Per-page, per-locale |
| Code injection | Inside Settings tab | Standalone section |
| Scalability | 1 page only | Multi-page sites |

### Data structure for v2

```json
{
  "pages": {
    "home": {
      "en": { "hero.title": "...", "hero.description": "..." },
      "ru": { "hero.title": "...", "hero.description": "..." }
    },
    "about": {
      "en": { "about.text": "..." },
      "ru": { "about.text": "..." }
    }
  },
  "options": {
    "header": {
      "en": { "nav.home": "Home", "nav.about": "About", "cta": "Book Now" },
      "ru": { "nav.home": "Главная", "nav.about": "О нас", "cta": "Забронировать" }
    },
    "footer": {
      "en": { "copyright": "All rights reserved." },
      "ru": { "copyright": "Все права защищены." }
    }
  },
  "gallery": ["images/photo1.avif", "images/photo2.avif"],
  "codeInjection": { "head": "<script>...</script>", "footer": "" },
  "seo": {
    "home": {
      "en": { "title": "...", "description": "...", "ogImage": "..." },
      "ru": { "title": "...", "description": "...", "ogImage": "..." }
    }
  }
}
```

### UI flow

1. Click **Pages → Home** in sidebar
2. See locale tabs: **EN | RU | UA | GE | AM | KZ**
3. Each tab shows fields for that page in that language
4. Click **Options → Header** — same locale tabs, but for shared header fields
5. **Gallery** — no locales, shared images
6. **Code Injection** — no locales, global head/footer HTML
7. **SEO** — select page, then locale, then title/description/OG

### Build integration

```
Admin saves → writes per-page JSON
Build script reads JSON → generates static HTML per page per locale:
  /en/index.html, /ru/index.html         (home)
  /en/about/index.html, /ru/about/       (about)
  /en/services/, /ru/services/           (services)
```

This is the architecture to use for the next multi-page project.
