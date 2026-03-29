<?php
/**
 * Admin panel configuration
 * Change these values after first deployment!
 */

// Secret key for JWT-like session tokens (change this!)
define('AUTH_SECRET', 'hf_change_this_secret_key_in_production_2026');

// Session lifetime in seconds (4 hours)
define('SESSION_LIFETIME', 4 * 60 * 60);

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
