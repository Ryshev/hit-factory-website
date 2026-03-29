<?php
/**
 * Admin panel configuration
 * Change these values after first deployment!
 */

// Secret key for session tokens — MUST be unique per deployment
define('AUTH_SECRET', 'JW378nXs7QZGQ4xpqEjj98rXY9hmr6yExmwNEFfT3v3zjve_hSfxaHs-kBNw_7Mc');

// Session lifetime in seconds (2 hours)
define('SESSION_LIFETIME', 2 * 60 * 60);

// Data storage paths
define('DATA_DIR', __DIR__ . '/data');
define('USERS_FILE', DATA_DIR . '/users.json');
define('SITE_DATA_FILE', DATA_DIR . '/site-data.json');
define('IMAGES_DIR', dirname(__DIR__) . '/images');

// Initial admin email
define('INITIAL_ADMIN_EMAIL', 'dartryshev@gmail.com');

// SMTP settings for password reset (leave empty to log to file)
define('SMTP_HOST', '');
define('SMTP_PORT', 587);
define('SMTP_USER', '');
define('SMTP_PASS', '');
define('SMTP_FROM', 'noreply@hitfactory.band');

// Base URL
define('BASE_URL', 'https://hitfactory.band');
