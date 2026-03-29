const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const ADMIN_SLUG = 'hf-manage';
const DATA_FILE = path.join(__dirname, 'site', 'admin', 'data', 'site-data.json');
const IMG_DIR = path.join(__dirname, 'site', 'images');

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, IMG_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = file.originalname
      .replace(ext, '')
      .replace(/[^a-zA-Z0-9_-]/g, '-')
      .toLowerCase();
    const unique = Date.now().toString(36);
    cb(null, `${name}-${unique}${ext}`);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /\.(avif|jpg|jpeg|png|webp)$/i;
    cb(null, allowed.test(path.extname(file.originalname)));
  },
  limits: { fileSize: 20 * 1024 * 1024 }
});

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'site')));

// Default data structure
function getDefaultData() {
  return {
    seo: {
      title: 'Hit Factory — Professional Cover Band | Live Music for Events',
      description: 'Hit Factory is a professional cover band delivering unforgettable live performances. Book us for corporate events, weddings, and private celebrations.',
      keywords: 'cover band, live music, event band, Hit Factory, wedding band, corporate entertainment',
      canonical: 'https://hitfactory.band/',
      ogImage: 'https://hitfactory.band/images/og-image.jpg'
    },
    contact: {
      phone: '+1 (234) 567-890',
      phoneLink: 'tel:+1234567890',
      email: 'info@hitfactory.band',
      instagram: '@hitfactory',
      instagramUrl: 'https://instagram.com/hitfactory'
    },
    video: {
      youtubeId: '',
      posterImage: 'images/band-full-pink.avif'
    },
    stats: {
      musicians: '5',
      songs: '200+',
      events: '100+',
      years: '5+'
    },
    gallery: [
      'images/band-full-teal.avif',
      'images/vocalist-singing.avif',
      'images/duo-stage.avif',
      'images/bassist-solo-white.avif',
      'images/duo-guitar-vocal.avif',
      'images/vocalist-blue.avif',
      'images/guitarist-acoustic.avif',
      'images/band-full-led.avif',
      'images/band-full-pink.avif',
      'images/band-silhouette.avif'
    ],
    translations: {}
  };
}

// Extract translations from i18n.js on first run
function loadTranslationsFromSource() {
  try {
    const src = fs.readFileSync(path.join(__dirname, 'site', 'js', 'i18n.js'), 'utf8');
    // Extract the translations object by evaluating the const assignment
    const match = src.match(/const translations\s*=\s*(\{[\s\S]*?\n\};)/);
    if (match) {
      const obj = new Function('return ' + match[1].replace(/;$/, ''))();
      return obj;
    }
  } catch (e) {
    console.error('Could not parse i18n.js:', e.message);
  }
  return {};
}

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Error loading data:', e.message);
  }
  // First run: populate translations from i18n.js
  const data = getDefaultData();
  data.translations = loadTranslationsFromSource();
  return data;
}

function saveData(data) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// API: Get site data
app.get(`/${ADMIN_SLUG}/api/data`, (req, res) => {
  res.json(loadData());
});

// API: Save site data
app.post(`/${ADMIN_SLUG}/api/data`, (req, res) => {
  try {
    saveData(req.body);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// API: List images
app.get(`/${ADMIN_SLUG}/api/images`, (req, res) => {
  const files = fs.readdirSync(IMG_DIR).filter(f => /\.(avif|jpg|jpeg|png|webp)$/i.test(f));
  res.json(files.map(f => 'images/' + f));
});

// API: Upload images
app.post(`/${ADMIN_SLUG}/api/images/upload`, upload.array('photos', 20), (req, res) => {
  const uploaded = req.files.map(f => 'images/' + f.filename);
  res.json({ success: true, files: uploaded });
});

// API: Delete image
app.delete(`/${ADMIN_SLUG}/api/images/:filename`, (req, res) => {
  const filePath = path.join(IMG_DIR, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  fs.unlinkSync(filePath);
  res.json({ success: true });
});

// Serve admin page
app.get(`/${ADMIN_SLUG}`, (req, res) => {
  res.sendFile(path.join(__dirname, 'site', 'admin', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Admin server running at http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/${ADMIN_SLUG}`);
  console.log(`Site preview: http://localhost:${PORT}/`);
});
