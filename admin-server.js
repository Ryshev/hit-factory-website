require('dotenv').config();
const express = require('express');
const multer = require('multer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_SLUG = process.env.ADMIN_SLUG || 'hf-manage';
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('FATAL: JWT_SECRET environment variable is required. Set it in .env file.');
  process.exit(1);
}
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const DATA_DIR = path.join(__dirname, 'site', 'admin', 'data');
const DATA_FILE = path.join(DATA_DIR, 'site-data.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const IMG_DIR = path.join(__dirname, 'site', 'images');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ==================== SECURITY ====================
app.use(helmet({
  contentSecurityPolicy: false, // Allow inline styles/scripts in admin
  crossOriginEmbedderPolicy: false
}));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// Rate limiting on auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per window
  message: { error: 'Too many attempts, try again in 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false
});

// Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, IMG_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
    cb(null, `${name}-${Date.now().toString(36)}${ext}`);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    cb(null, /\.(avif|jpg|jpeg|png|webp)$/i.test(path.extname(file.originalname)));
  },
  limits: { fileSize: 20 * 1024 * 1024 }
});

// Static files for the public site
app.use(express.static(path.join(__dirname, 'site'), {
  index: 'index.html',
  dotfiles: 'deny'
}));

// ==================== USER MANAGEMENT ====================
function loadUsers() {
  try {
    if (fs.existsSync(USERS_FILE)) return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  } catch (e) { console.error('Error loading users:', e.message); }
  return [];
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

async function createUser(email, password, role = 'admin') {
  const users = loadUsers();
  if (users.find(u => u.email === email.toLowerCase())) return null;
  const hash = await bcrypt.hash(password, 12);
  const user = {
    id: crypto.randomUUID(),
    email: email.toLowerCase(),
    password: hash,
    role,
    createdAt: new Date().toISOString()
  };
  users.push(user);
  saveUsers(users);
  return user;
}

// Create initial admin if no users exist
async function ensureInitialAdmin() {
  const users = loadUsers();
  if (users.length === 0) {
    const initialPassword = crypto.randomBytes(8).toString('hex');
    await createUser('dartryshev@gmail.com', initialPassword, 'superadmin');
    console.log('='.repeat(60));
    console.log('  INITIAL ADMIN CREATED');
    console.log('  Email:    dartryshev@gmail.com');
    console.log(`  Password: ${initialPassword}`);
    console.log('  Change this password after first login!');
    console.log('='.repeat(60));
  }
}

// ==================== AUTH MIDDLEWARE ====================
function verifyToken(req, res, next) {
  const token = req.cookies?.hf_token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    req.user = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
    next();
  } catch (e) {
    res.clearCookie('hf_token');
    return res.status(401).json({ error: 'Session expired' });
  }
}

function requireSuperadmin(req, res, next) {
  if (req.user?.role !== 'superadmin') {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }
  next();
}

// ==================== SMTP ====================
function getTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
}

// ==================== SITE DATA ====================
function loadTranslationsFromSource() {
  try {
    const src = fs.readFileSync(path.join(__dirname, 'site', 'js', 'i18n.js'), 'utf8');
    const match = src.match(/const translations\s*=\s*(\{[\s\S]*?\n\};)/);
    if (match) return new Function('return ' + match[1].replace(/;$/, ''))();
  } catch (e) { console.error('Could not parse i18n.js:', e.message); }
  return {};
}

function getDefaultData() {
  return {
    seo: {
      title: 'Hit Factory — Premium Cover Band | Live Music for Events',
      description: 'Hit Factory is a premium cover band delivering unforgettable live performances.',
      keywords: 'cover band, live music, event band, Hit Factory, wedding band',
      canonical: 'https://hitfactory.band/',
      ogImage: 'https://hitfactory.band/images/og-image.jpg'
    },
    contact: {
      phone: '+1 (234) 567-890', phoneLink: 'tel:+1234567890',
      email: 'info@hitfactory.band',
      instagram: '@hitfactory', instagramUrl: 'https://instagram.com/hitfactory'
    },
    video: { youtubeId: 'BGo9yW8Uocs', posterImage: 'images/band-full-pink.avif' },
    stats: { musicians: '5', songs: '100+', events: '100+', years: '5+' },
    gallery: [
      'images/band-full-teal.avif','images/vocalist-singing.avif','images/duo-stage.avif',
      'images/bassist-solo-white.avif','images/duo-guitar-vocal.avif','images/vocalist-blue.avif',
      'images/guitarist-acoustic.avif','images/band-full-led.avif','images/band-full-pink.avif',
      'images/band-silhouette.avif'
    ],
    translations: {}
  };
}

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) { console.error('Error loading data:', e.message); }
  const data = getDefaultData();
  data.translations = loadTranslationsFromSource();
  return data;
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ==================== AUTH ROUTES ====================
const A = `/${ADMIN_SLUG}`;

// Login page
app.get(A, (req, res) => {
  const token = req.cookies?.hf_token;
  if (token) {
    try { jwt.verify(token, JWT_SECRET); return res.redirect(`${A}/dashboard`); }
    catch (e) { /* expired, show login */ }
  }
  res.sendFile(path.join(__dirname, 'site', 'admin', 'login.html'));
});

// Dashboard (protected)
app.get(`${A}/dashboard`, verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'site', 'admin', 'index.html'));
});

// Login API
app.post(`${A}/api/login`, authLimiter, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const users = loadUsers();
  const user = users.find(u => u.email === email.toLowerCase());
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '4h', algorithm: 'HS256' });
  res.cookie('hf_token', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 4 * 60 * 60 * 1000 // 4 hours
  });
  res.json({ success: true, email: user.email, role: user.role });
});

// Logout
app.post(`${A}/api/logout`, (req, res) => {
  res.clearCookie('hf_token');
  res.json({ success: true });
});

// Who am I
app.get(`${A}/api/me`, verifyToken, (req, res) => {
  res.json({ email: req.user.email, role: req.user.role });
});

// Change password
app.post(`${A}/api/change-password`, verifyToken, authLimiter, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters' });
  }
  const users = loadUsers();
  const user = users.find(u => u.id === req.user.id);
  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }
  user.password = await bcrypt.hash(newPassword, 12);
  saveUsers(users);
  res.json({ success: true });
});

// Request password reset
app.post(`${A}/api/forgot-password`, authLimiter, async (req, res) => {
  const { email } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.email === email?.toLowerCase());

  // Always return success to prevent email enumeration
  if (!user) return res.json({ success: true });

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetToken = await bcrypt.hash(resetToken, 10);
  user.resetExpires = Date.now() + 3600000; // 1 hour
  saveUsers(users);

  const resetUrl = `${BASE_URL}/${ADMIN_SLUG}?reset=${resetToken}&email=${encodeURIComponent(user.email)}`;
  const transporter = getTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@hitfactory.band',
        to: user.email,
        subject: 'Hit Factory — Password Reset',
        html: `<p>Click the link below to reset your password:</p>
               <p><a href="${resetUrl}">${resetUrl}</a></p>
               <p>This link expires in 1 hour.</p>`
      });
    } catch (e) {
      console.error('Email send error:', e.message);
    }
  } else {
    console.log('SMTP not configured. Reset link:', resetUrl);
  }

  res.json({ success: true });
});

// Execute password reset
app.post(`${A}/api/reset-password`, authLimiter, async (req, res) => {
  const { email, token, newPassword } = req.body;
  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }
  const users = loadUsers();
  const user = users.find(u => u.email === email?.toLowerCase());
  if (!user || !user.resetToken || !user.resetExpires || user.resetExpires < Date.now()) {
    return res.status(400).json({ error: 'Invalid or expired reset link' });
  }
  if (!(await bcrypt.compare(token, user.resetToken))) {
    return res.status(400).json({ error: 'Invalid reset token' });
  }

  user.password = await bcrypt.hash(newPassword, 12);
  delete user.resetToken;
  delete user.resetExpires;
  saveUsers(users);
  res.json({ success: true });
});

// ==================== ADMIN MANAGEMENT (superadmin only) ====================
app.get(`${A}/api/admins`, verifyToken, requireSuperadmin, (req, res) => {
  const users = loadUsers().map(u => ({ id: u.id, email: u.email, role: u.role, createdAt: u.createdAt }));
  res.json(users);
});

app.post(`${A}/api/admins`, verifyToken, requireSuperadmin, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || password.length < 8) {
    return res.status(400).json({ error: 'Valid email and password (8+ chars) required' });
  }
  const user = await createUser(email, password);
  if (!user) return res.status(409).json({ error: 'User already exists' });
  res.json({ success: true, id: user.id, email: user.email });
});

app.delete(`${A}/api/admins/:id`, verifyToken, requireSuperadmin, (req, res) => {
  if (req.params.id === req.user.id) {
    return res.status(400).json({ error: 'Cannot delete yourself' });
  }
  const users = loadUsers();
  const target = users.find(u => u.id === req.params.id);
  if (!target) return res.status(404).json({ error: 'User not found' });
  // Prevent deleting last superadmin
  if (target.role === 'superadmin' && users.filter(u => u.role === 'superadmin').length <= 1) {
    return res.status(400).json({ error: 'Cannot delete the last superadmin' });
  }
  const idx = users.indexOf(target);
  users.splice(idx, 1);
  saveUsers(users);
  res.json({ success: true });
});

// ==================== PROTECTED DATA ROUTES ====================
app.get(`${A}/api/data`, verifyToken, (req, res) => res.json(loadData()));

app.post(`${A}/api/data`, verifyToken, (req, res) => {
  try { saveData(req.body); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get(`${A}/api/images`, verifyToken, (req, res) => {
  const files = fs.readdirSync(IMG_DIR).filter(f => /\.(avif|jpg|jpeg|png|webp)$/i.test(f));
  res.json(files.map(f => 'images/' + f));
});

app.post(`${A}/api/images/upload`, verifyToken, upload.array('photos', 20), (req, res) => {
  res.json({ success: true, files: req.files.map(f => 'images/' + f.filename) });
});

app.delete(`${A}/api/images/:filename`, verifyToken, (req, res) => {
  const filename = path.basename(req.params.filename); // Prevent path traversal
  const filePath = path.join(IMG_DIR, filename);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Not found' });
  fs.unlinkSync(filePath);
  res.json({ success: true });
});

// ==================== START ====================
ensureInitialAdmin().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/${ADMIN_SLUG}`);
  });
});
