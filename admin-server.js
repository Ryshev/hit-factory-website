const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const ADMIN_SLUG = 'hf-manage';
const DATA_FILE = path.join(__dirname, 'site', 'admin', 'data', 'site-data.json');

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
    translations: {}  // Will be populated from i18n.js defaults
  };
}

// Load data
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Error loading data:', e.message);
  }
  return getDefaultData();
}

// Save data
function saveData(data) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// API routes — protected under admin slug
app.get(`/${ADMIN_SLUG}/api/data`, (req, res) => {
  res.json(loadData());
});

app.post(`/${ADMIN_SLUG}/api/data`, (req, res) => {
  try {
    saveData(req.body);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get(`/${ADMIN_SLUG}/api/images`, (req, res) => {
  const imgDir = path.join(__dirname, 'site', 'images');
  const files = fs.readdirSync(imgDir).filter(f => /\.(avif|jpg|png|webp)$/i.test(f));
  res.json(files.map(f => 'images/' + f));
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
