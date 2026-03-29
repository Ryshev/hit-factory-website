# Hit Factory — Premium Cover Band Website

Website for **Hit Factory**, a premium cover band fronted by the ex-guitarist of Gradusy.

**Live:** https://hitfactory.band
**Admin:** https://hitfactory.band/hf-manage/

## Features

- **Single-page design** — Hero, About (with embedded YouTube video), Gallery, Contact
- **Dark theme** with neon gradient accents (pink, purple, blue)
- **Animated FACTORY gradient** — shifts left-right in hero title (5s loop)
- **6 languages** with country-code URL slugs: `/ru/`, `/ua/`, `/ge/`, `/am/`, `/kz/`
- **SEO-optimized locales** — static HTML per language with hreflang, canonical, OG tags
- **Dynamic content** — admin edits (text, gallery, code injection) reflect on frontend instantly
- **Auto language detection** — .htaccess redirects by browser Accept-Language
- **Lazy-loaded YouTube** (lite-youtube facade — zero KB until click, pauses on tab switch/scroll)
- **Varied gallery grid** — 6-column layout with alternating patterns, auto-fills any photo count
- **Photo lightbox** — keyboard navigation (arrows + Esc), click outside to close
- **Scroll reveal** animations via IntersectionObserver
- **Responsive** — fluid typography (clamp), mobile hamburger menu, closes on outside click
- **SEO** — meta tags, Open Graph, Twitter Cards, JSON-LD, robots.txt, sitemap.xml
- **Google Analytics** and verification tag in static HTML on all pages
- **PHP admin panel** — works on shared hosting, no Node.js/database needed

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3 (custom properties, grid, clamp), vanilla JS |
| Fonts | Oswald (Latin + Cyrillic), Noto Sans Georgian, Noto Sans Armenian |
| Images | AVIF format, optimized from HEIC/DNG originals |
| Admin backend | PHP 8.x (shared hosting compatible, JSON file storage) |
| Auth | HMAC-signed cookies, bcrypt passwords (cost 12), rate limiting |
| Build | Node.js scripts (locale generation, image conversion) |
| Hosting | Namecheap shared hosting (cPanel) |
| SSL | Let's Encrypt via acme.sh (auto-renewal via cron) |
| Deployment | SSH (port 21098) + SCP |

## Project Structure

```
site/                           # Production site (→ public_html on server)
├── index.html                  # English (root locale, build template)
├── ru/index.html               # Russian
├── ua/index.html               # Ukrainian
├── ge/index.html               # Georgian
├── am/index.html               # Armenian
├── kz/index.html               # Kazakh
├── css/styles.css              # All styles
├── js/
│   ├── main.js                 # Lightbox, gallery layout, YouTube, dynamic content
│   └── i18n.js                 # Translation strings (source of truth for build)
├── images/                     # Optimized AVIF photos + OG image (og-image.jpg)
├── data/
│   └── content.json            # Dynamic content (written by admin, read by frontend JS)
├── favicon.svg                 # SVG favicon (HF gradient)
├── robots.txt                  # Blocks /hf-manage/ and /admin/
├── sitemap.xml                 # All locale URLs with hreflang
├── .htaccess                   # HTTPS, language detection, old slug redirects, caching, gzip
└── hf-manage/                  # PHP admin panel
    ├── index.html              # Login page (math CAPTCHA + honeypot)
    ├── dashboard.html          # Admin dashboard SPA
    ├── api.php                 # REST API (auth, data, images, file upload)
    ├── config.php              # Configuration (AUTH_SECRET, SMTP, paths)
    ├── .htaccess               # API routing, data directory protection
    └── data/                   # JSON storage (git-ignored)
        ├── users.json          # Admin accounts (bcrypt hashed passwords)
        ├── site-data.json      # Full admin data (private)
        ├── translations-default.json  # Exported from i18n.js for initial load
        └── .htaccess           # Deny from all

build-locales.js                # Generates static HTML per locale from i18n.js
admin-server.js                 # Node.js admin server (local development only)
.env / .env.example             # Environment config (git-ignored / template)
Mediafiles/                     # Original HEIC/DNG/video files (git-ignored)
docs/architecture-guide.md      # Reusable architecture patterns
```

## Content Architecture

```
                    BUILD TIME                          RUNTIME
                    ─────────                          ───────
i18n.js ──► build-locales.js ──► Static HTML      ◄── content.json ◄── PHP Admin
            (translations)       (SEO-friendly)       (dynamic edits)
```

**Two-layer system:**
1. **Static HTML** — translated text baked in by build script (SEO crawlers see it, works without JS)
2. **content.json** — admin-edited content loaded by JS on page load (overrides static text, instant updates)

**What admin can change dynamically (no rebuild needed):**
- All text on all 6 languages
- Gallery photos (add, remove, reorder)
- Custom code injection (head + footer)

**What requires rebuild (`node build-locales.js` + deploy):**
- Adding/removing a language
- Changing HTML structure
- Updating Google Analytics or verification tags

## Quick Start

### Local development

```bash
npm install
npx http-server site -p 8080    # Preview site
node admin-server.js            # Local admin panel (Node.js version)
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

# Common partial deploys
scp site/css/styles.css hitfactory:~/public_html/css/
scp site/js/main.js hitfactory:~/public_html/js/
scp -r site/index.html site/ru site/ua site/ge site/am site/kz hitfactory:~/public_html/
scp site/hf-manage/api.php site/hf-manage/dashboard.html hitfactory:~/public_html/hf-manage/
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

### Sidebar Navigation

| Section | What it does |
|---------|-------------|
| 🇬🇧 English ... 🇰🇿 Kazakh | Edit translations for each language. Tabbed by: Hero, About, Navigation, Gallery & Video, Contact, Footer, SEO |
| Gallery | Drag-and-drop reorder, upload new photos, delete, add from existing server images |
| Settings | Contact info, YouTube video ID, statistics, **Code Injection** (custom head/footer HTML) |
| Admins | Add/remove admin users (superadmin only), change password |

### SEO Tab (per language)

Each language page has an SEO tab with:
- **Page Title** — used for `<title>` tag and OG title (per-locale)
- **Meta Description** — used for meta description and OG description (per-locale)
- **Keywords** — shared across all locales
- **Canonical URL** — base URL, shared
- **OG Image** — visual upload with preview, shared across all locales

### Code Injection (Settings → Code Injection)

- **Custom Head Code** — for meta tags, analytics, verification (injected via JS)
- **Custom Footer Code** — for tracking pixels, chat widgets
- **Note:** Google verification and Analytics are in static HTML (not JS-injected) for crawler compatibility

### How Admin Edits Work

```
Admin edits text/gallery → clicks Save All
    ↓
PHP writes site-data.json (private, full data)
PHP writes /data/content.json (public subset: gallery, translations, code)
    ↓
User visits site → JS fetches /data/content.json
    ↓
JS overrides data-i18n elements with admin text
JS rebuilds gallery from admin photo list
JS injects custom head/footer code
    ↓
User sees latest content (no rebuild needed)
```

### Resetting Admin Passwords

Upload a temporary PHP script, execute via URL, delete:

```php
<?php
$file = '/home/hitfstmo/public_html/hf-manage/data/users.json';
$users = json_decode(file_get_contents($file), true);
$users[0]['password'] = password_hash('NewPassword123!', PASSWORD_BCRYPT, ['cost' => 12]);
file_put_contents($file, json_encode($users, JSON_PRETTY_PRINT));
echo "Done";
```

### First Login

On first access, an initial admin account is created. Password saved to:
`hf-manage/data/initial_password.txt` (auto-deleted after first successful login)

### Security

- HMAC-signed httpOnly cookies (2h expiry, SameSite=Strict, Secure in production)
- Cryptographically random AUTH_SECRET (48 bytes, base64url)
- bcrypt password hashing (cost 12)
- File-based rate limiting (10 req / 15 min on auth, 30/min on data save)
- Honeypot field + math CAPTCHA on login form
- MIME type validation on file uploads (finfo magic bytes, not just extension)
- Gallery image src whitelist (regex filter, only `images/*.{avif,jpg,png,webp}`)
- X-Frame-Options: DENY, X-Content-Type-Options: nosniff on admin
- .htaccess blocks `data/` directory from direct access
- `noindex, nofollow` + Referrer-Policy on admin pages
- Path traversal protection (`basename()`) on file operations
- Initial password file auto-deleted after first login
- Superadmin role required for user management
- Cannot delete last superadmin or yourself

## Locale System

### URL Structure

| Language | URL Slug | hreflang | Nav Label |
|----------|----------|----------|-----------|
| English | `/` (root) | `en` | EN |
| Russian | `/ru/` | `ru` | RU |
| Ukrainian | `/ua/` | `uk` | UA |
| Georgian | `/ge/` | `ka` | GE |
| Armenian | `/am/` | `hy` | AM |
| Kazakh | `/kz/` | `kk` | KZ |

### Old Slug Redirects (301)

```
/uk/ → /ua/    /ka/ → /ge/    /hy/ → /am/    /kk/ → /kz/
```

### Build Script: `build-locales.js`

For each language:
1. Replaces `data-i18n` elements with translated text
2. Sets `<html lang>`, canonical URL, og:url, og:locale, og:title, og:description
3. Fixes asset paths (absolute `/paths` for subdirectory locales)
4. Removes old hreflang tags, inserts fresh ones
5. Sets active language button in nav switcher
6. Writes to `/{slug}/index.html`

**Slug mapping** (`SLUG_MAP`): `{ en:'en', ru:'ru', uk:'ua', ka:'ge', hy:'am', kk:'kz' }`

### Adding a New Language

1. Add translation object in `site/js/i18n.js`
2. Add entry in `SLUG_MAP` in `build-locales.js`
3. Add `<a>` button in `nav-lang` div in `site/index.html`
4. Add font imports if needed (non-Latin scripts)
5. Run `node build-locales.js`
6. Export translations: `node -e "..." > translations-default.json`
7. Update `sitemap.xml`, `.htaccess` (language detection + old slug redirect)
8. Deploy

## Gallery System

### Varied Layout

6-column CSS grid with JS-assigned spans per item:

```
Row patterns (cycle): [3,3] → [2,2,2] → [2,4] → [4,2] → [3,3] → [2,2,2]
Last row: items distributed evenly to fill all 6 columns
```

Works with any number of photos — no empty space.

### Responsive

- Desktop: 6-column grid (280px rows)
- Tablet: 4-column grid (220px rows)
- Mobile: 2-column grid (180px rows)
- Small mobile: 1-column grid (240px rows)

### Admin Gallery Management

- Drag-and-drop reorder (HTML5 Drag API)
- Upload via drop zone or file picker
- Delete photos
- Add from existing server images (modal picker)
- Changes saved to `content.json` → visible on site immediately

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

- Lite-youtube facade — no iframe until click
- Pauses on tab switch (`visibilitychange`)
- Pauses on scroll out of viewport (`IntersectionObserver`)
- Uses `youtube-nocookie.com` for privacy
- `enablejsapi=1` for postMessage control
- Video ID configurable in admin (Settings → Video)

## SSL

Let's Encrypt via acme.sh:
- Auto-renewal via cron (daily at 08:54)
- Deployed to cPanel via `cpanel_uapi` hook
- Covers `hitfactory.band` + `www.hitfactory.band`

## Contacts

- Two Georgian phone numbers with Telegram/WhatsApp icons (decorative, non-clickable)
- Email: hitfactorymusicband@gmail.com
- Instagram: @hitfactory_band
- Contact grid: 2×2 layout (phones top row, email + Instagram bottom row)

## Schema.org Structured Data

Three JSON-LD schemas on every page:

| Type | Purpose |
|------|---------|
| **MusicGroup** | Band info: genres (Pop, Rock, Dance, Cover), 5 members, languages, area served, booking offer |
| **EntertainmentBusiness** | Local business: Tbilisi address, price range, Instagram, contact |
| **WebSite** | Site meta: 6 languages, CommunicateAction for booking |

Area served: Georgia, Armenia, Kazakhstan, Europe, International.

## Cache Busting

CSS and JS files get `?v=YYYYMMDD-HHMM` suffix on every build:
```
styles.css?v=20260329-2117
main.js?v=20260329-2117
```
Generated automatically by `build-locales.js`. Forces cache clear on all devices after deploy.

## Performance

- AVIF images (5-10x smaller than JPEG)
- Lazy loading (`loading="lazy"`) on all below-fold images
- YouTube facade (zero network requests until play)
- Google Fonts with `display=swap`
- Gzip compression + cache headers via .htaccess
- No JavaScript frameworks (~6KB total JS)
- Fluid typography with `clamp()` — no layout shifts on resize
- CSS/JS cache busting via versioned query strings

## Testing Checklist

No automated tests (project is a static site + simple PHP API). Use this manual checklist after changes:

### Frontend
- [ ] All 6 locale pages load (`/`, `/ru/`, `/ua/`, `/ge/`, `/am/`, `/kz/`)
- [ ] Language switcher navigates between locales
- [ ] Hero background image visible
- [ ] YouTube video plays on click, pauses on tab switch
- [ ] Gallery loads from content.json, lightbox works (click, arrows, Esc)
- [ ] Gallery adapts to different photo counts (no empty space)
- [ ] Contact links work (tel:, mailto:, Instagram)
- [ ] Mobile: hamburger menu opens/closes, closes on outside click
- [ ] Mobile: no horizontal scroll, text readable
- [ ] Scroll reveal animations trigger on scroll
- [ ] Footer year auto-generated

### Admin Panel
- [ ] Login with CAPTCHA works
- [ ] Incorrect password shows error, rate-limits after 10 attempts
- [ ] Edit text on any language → Save → text appears on site
- [ ] Gallery: drag reorder, upload, delete → Save → reflected on site
- [ ] SEO fields per-locale (page title, meta description)
- [ ] OG image upload with preview
- [ ] Code injection: head and footer fields
- [ ] Settings: contacts, video ID, stats
- [ ] Admins: add/remove (superadmin only), change password
- [ ] Logout works, session expires after 2h

### SEO
- [ ] `<title>` and `<meta description>` per locale
- [ ] `og:title`, `og:description`, `og:image` on all pages
- [ ] hreflang tags present and correct
- [ ] robots.txt blocks `/hf-manage/`
- [ ] sitemap.xml lists all locale URLs
- [ ] Google verification meta tag in static HTML
- [ ] Old slugs (/uk/, /ka/, /hy/, /kk/) 301-redirect to new ones
- [ ] Schema.org JSON-LD: MusicGroup + EntertainmentBusiness + WebSite
- [ ] CSS/JS have single `?v=` version (no duplication)

### Security
- [ ] Admin pages return `X-Frame-Options: DENY`
- [ ] File upload rejects non-image MIME types
- [ ] Cannot access `hf-manage/data/` directly (403)
- [ ] CSS/JS have `?v=` cache busting parameter

## Security Audit Summary

Last audit: March 29, 2026. Key findings addressed:

| Issue | Severity | Status |
|-------|----------|--------|
| Hardcoded AUTH_SECRET | CRITICAL | Fixed — random 48-byte secret |
| Gallery XSS via img src | HIGH | Fixed — regex whitelist filter |
| No MIME validation on upload | HIGH | Fixed — finfo magic bytes check |
| No rate limit on data save | HIGH | Fixed — 30/min limit |
| Missing security headers | MEDIUM | Fixed — X-Frame-Options, X-Content-Type-Options |
| Password logged in plaintext | MEDIUM | Fixed — auto-deleted after first login |
| Session lifetime too long | LOW | Fixed — reduced to 2 hours |

### Known Limitations (accepted risk)
- No CSRF tokens (mitigated by SameSite=Strict cookies)
- No 2FA (low-traffic admin, acceptable for now)
- No audit logging (consider adding if multiple admins active)
- Code injection fields trust admin input (by design — admin-only feature)
- Data stored in JSON files within webroot (protected by .htaccess)

## License

All rights reserved. Photos and content are property of Hit Factory.
