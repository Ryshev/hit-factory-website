/**
 * Build script: generates static HTML pages for each locale.
 * English (en) -> /index.html (root)
 * Other langs  -> /ru/index.html, /uk/index.html, etc.
 */
const fs = require('fs');
const path = require('path');

const SITE_DIR = path.join(__dirname, 'site');
const TEMPLATE = fs.readFileSync(path.join(SITE_DIR, 'index.html'), 'utf8');

// Load translations from i18n.js
const i18nSrc = fs.readFileSync(path.join(SITE_DIR, 'js', 'i18n.js'), 'utf8');
const match = i18nSrc.match(/const translations\s*=\s*(\{[\s\S]*?\n\};)/);
const translations = new Function('return ' + match[1].replace(/;$/, ''))();

const LANGS = Object.keys(translations);
const BASE_URL = 'https://hitfactory.band';

// Build hreflang tags for all languages
function buildHreflangTags() {
  let tags = '';
  LANGS.forEach(lang => {
    const href = lang === 'en' ? `${BASE_URL}/` : `${BASE_URL}/${lang}/`;
    tags += `  <link rel="alternate" hreflang="${lang}" href="${href}">\n`;
  });
  tags += `  <link rel="alternate" hreflang="x-default" href="${BASE_URL}/">`;
  return tags;
}

// Replace data-i18n elements with translated text
function applyTranslations(html, lang) {
  const t = translations[lang];
  if (!t) return html;

  // Replace data-i18n attributes with translated content
  html = html.replace(/(<[^>]+data-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/[^>]+>)/g,
    (match, openTag, key, content, closeTag) => {
      if (t[key]) {
        return openTag + t[key] + closeTag;
      }
      return match;
    }
  );

  // Set html lang attribute
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);

  // Update page title
  if (t['page.title']) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${t['page.title']}</title>`);
  }

  // Update canonical URL
  const canonical = lang === 'en' ? `${BASE_URL}/` : `${BASE_URL}/${lang}/`;
  html = html.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${canonical}">`
  );

  // Update OG URL
  html = html.replace(
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${canonical}">`
  );

  // Set OG locale
  const localeMap = { en: 'en_US', ru: 'ru_RU', uk: 'uk_UA', ka: 'ka_GE', hy: 'hy_AM', kk: 'kk_KZ' };
  html = html.replace(
    /<meta property="og:locale" content="[^"]*">/,
    `<meta property="og:locale" content="${localeMap[lang] || 'en_US'}">`
  );

  // Update OG title/description
  if (t['page.title']) {
    html = html.replace(
      /<meta property="og:title" content="[^"]*">/,
      `<meta property="og:title" content="${t['page.title'].replace(/"/g, '&quot;')}">`
    );
    html = html.replace(
      /<meta name="twitter:title" content="[^"]*">/,
      `<meta name="twitter:title" content="${t['page.title'].replace(/"/g, '&quot;')}">`
    );
  }
  if (t['hero.description']) {
    html = html.replace(
      /<meta property="og:description" content="[^"]*">/,
      `<meta property="og:description" content="${t['hero.description'].replace(/"/g, '&quot;')}">`
    );
    html = html.replace(
      /<meta name="twitter:description" content="[^"]*">/,
      `<meta name="twitter:description" content="${t['hero.description'].replace(/"/g, '&quot;')}">`
    );
    html = html.replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${t['hero.description'].replace(/"/g, '&quot;')}">`
    );
  }

  return html;
}

// Add hreflang and fix asset paths for subdirectory locales
function prepareForLocale(html, lang) {
  // Remove old hreflang and og:locale:alternate tags
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*">/g, '');
  html = html.replace(/\s*<meta property="og:locale:alternate" content="[^"]*">/g, '');

  // Insert fresh hreflang tags before </head>
  const hreflangTags = buildHreflangTags();
  html = html.replace(
    /(<\/head>)/,
    `\n${hreflangTags}\n$1`
  );

  // For non-root locales, fix relative asset paths to use absolute paths
  if (lang !== 'en') {
    html = html.replace(/href="css\//g, 'href="/css/');
    html = html.replace(/src="js\//g, 'src="/js/');
    html = html.replace(/src="images\//g, 'src="/images/');
    html = html.replace(/srcset="images\//g, 'srcset="/images/');
    html = html.replace(/href="favicon\.svg"/g, 'href="/favicon.svg"');
    html = html.replace(/href="apple-touch-icon\.png"/g, 'href="/apple-touch-icon.png"');
    html = html.replace(/url\('images\//g, "url('/images/");
  }

  // Fix OG image to always use absolute URL
  html = html.replace(
    /<meta property="og:image" content="[^"]*">/,
    `<meta property="og:image" content="${BASE_URL}/images/og-image.jpg">`
  );
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*">/,
    `<meta name="twitter:image" content="${BASE_URL}/images/og-image.jpg">`
  );

  // Update active language in switcher
  // Remove active from all lang buttons, add to current
  html = html.replace(/class="lang-btn active"/g, 'class="lang-btn"');
  html = html.replace(
    new RegExp(`class="lang-btn" data-lang="${lang}"`),
    `class="lang-btn active" data-lang="${lang}"`
  );

  return html;
}

// Build all locales
console.log('Building locale pages...\n');

LANGS.forEach(lang => {
  let html = TEMPLATE;
  html = applyTranslations(html, lang);
  html = prepareForLocale(html, lang);

  if (lang === 'en') {
    // Root — overwrite index.html
    const outPath = path.join(SITE_DIR, 'index.html');
    fs.writeFileSync(outPath, html, 'utf8');
    console.log(`  ${lang} -> /index.html`);
  } else {
    // Subdirectory
    const dir = path.join(SITE_DIR, lang);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const outPath = path.join(dir, 'index.html');
    fs.writeFileSync(outPath, html, 'utf8');
    console.log(`  ${lang} -> /${lang}/index.html`);
  }
});

console.log('\nDone! All locale pages generated.');
