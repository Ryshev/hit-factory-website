<?php
/**
 * Hit Factory Admin API
 * Handles authentication, data management, and image uploads
 */
require_once __DIR__ . '/config.php';

// Ensure data directory exists
if (!is_dir(DATA_DIR)) mkdir(DATA_DIR, 0750, true);

header('Content-Type: application/json');

// Rate limiting (simple file-based)
function checkRateLimit($action, $maxAttempts = 10, $windowSeconds = 900) {
    $file = DATA_DIR . '/ratelimit_' . md5($action . $_SERVER['REMOTE_ADDR']) . '.json';
    $now = time();
    $attempts = [];

    if (file_exists($file)) {
        $attempts = json_decode(file_get_contents($file), true) ?: [];
        $attempts = array_filter($attempts, fn($t) => $t > $now - $windowSeconds);
    }

    if (count($attempts) >= $maxAttempts) {
        http_response_code(429);
        echo json_encode(['error' => 'Too many attempts. Try again later.']);
        exit;
    }

    $attempts[] = $now;
    file_put_contents($file, json_encode($attempts));
}

// Session management using signed cookies
function createToken($userId, $email, $role) {
    $payload = [
        'id' => $userId,
        'email' => $email,
        'role' => $role,
        'exp' => time() + SESSION_LIFETIME
    ];
    $data = base64_encode(json_encode($payload));
    $sig = hash_hmac('sha256', $data, AUTH_SECRET);
    return $data . '.' . $sig;
}

function verifyToken() {
    $token = $_COOKIE['hf_token'] ?? '';
    if (!$token || strpos($token, '.') === false) return null;

    [$data, $sig] = explode('.', $token, 2);
    if (hash_hmac('sha256', $data, AUTH_SECRET) !== $sig) return null;

    $payload = json_decode(base64_decode($data), true);
    if (!$payload || ($payload['exp'] ?? 0) < time()) return null;

    return $payload;
}

function requireAuth() {
    $user = verifyToken();
    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Not authenticated']);
        exit;
    }
    return $user;
}

function requireSuperadmin() {
    $user = requireAuth();
    if ($user['role'] !== 'superadmin') {
        http_response_code(403);
        echo json_encode(['error' => 'Insufficient permissions']);
        exit;
    }
    return $user;
}

// User management
function loadUsers() {
    if (!file_exists(USERS_FILE)) return [];
    return json_decode(file_get_contents(USERS_FILE), true) ?: [];
}

function saveUsers($users) {
    file_put_contents(USERS_FILE, json_encode($users, JSON_PRETTY_PRINT));
}

function ensureInitialAdmin() {
    $users = loadUsers();
    if (count($users) > 0) return;

    $password = bin2hex(random_bytes(8));
    $users[] = [
        'id' => bin2hex(random_bytes(16)),
        'email' => INITIAL_ADMIN_EMAIL,
        'password' => password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]),
        'role' => 'superadmin',
        'createdAt' => date('c')
    ];
    saveUsers($users);

    // Log initial password to a secure file
    $logFile = DATA_DIR . '/initial_password.txt';
    file_put_contents($logFile, "Initial admin created\nEmail: " . INITIAL_ADMIN_EMAIL . "\nPassword: $password\nChange immediately!\n");
    chmod($logFile, 0600);
}

// Load default translations from pre-exported JSON
function loadTranslationsFromSource() {
    $jsonPath = DATA_DIR . '/translations-default.json';
    if (file_exists($jsonPath)) {
        return json_decode(file_get_contents($jsonPath), true) ?: [];
    }
    return [];
}

// Site data
function loadSiteData() {
    if (file_exists(SITE_DATA_FILE)) {
        $data = json_decode(file_get_contents(SITE_DATA_FILE), true) ?: [];
        // If translations are empty, load from i18n.js
        if (empty($data['translations'])) {
            $data['translations'] = loadTranslationsFromSource();
        }
        return $data;
    }
    $data = getDefaultData();
    $data['translations'] = loadTranslationsFromSource();
    return $data;
}

function getDefaultData() {
    return [
        'seo' => [
            'title' => 'Hit Factory — Premium Cover Band',
            'description' => 'Premium cover band for events',
            'keywords' => 'cover band, live music, Hit Factory',
            'canonical' => BASE_URL . '/',
            'ogImage' => BASE_URL . '/images/og-image.jpg'
        ],
        'contact' => [
            'phone' => '+1 (234) 567-890',
            'phoneLink' => 'tel:+1234567890',
            'email' => 'info@hitfactory.band',
            'instagram' => '@hitfactory',
            'instagramUrl' => 'https://instagram.com/hitfactory'
        ],
        'video' => ['youtubeId' => 'BGo9yW8Uocs', 'posterImage' => 'images/band-full-pink.avif'],
        'stats' => ['musicians' => '5', 'songs' => '200+', 'events' => '100+', 'years' => '5+'],
        'gallery' => [
            'images/band-full-teal.avif', 'images/duo-guitar-vocal.avif',
            'images/vocalist-singing.avif', 'images/guitarist-solo.avif',
            'images/vocalist-closeup.avif', 'images/band-full-led.avif',
            'images/bassist-solo-blue.avif', 'images/band-full-pink.avif',
            'images/duo-stage.avif', 'images/drummer-solo.avif',
            'images/guitarist-acoustic.avif', 'images/band-silhouette.avif',
            'images/vocalist-blue.avif', 'images/bassist-solo-white.avif',
            'images/guitarist-action.avif', 'images/vocalist-solo.avif',
            'images/band-full-blue.avif'
        ],
        'translations' => []
    ];
}

// Initialize
ensureInitialAdmin();

// Router
$method = $_SERVER['REQUEST_METHOD'];
$path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
// Remove base path prefix
$path = preg_replace('#^hf-manage/api/?#', '', $path);

// --- AUTH ROUTES ---
if ($path === 'login' && $method === 'POST') {
    checkRateLimit('login');
    $input = json_decode(file_get_contents('php://input'), true);
    $email = strtolower(trim($input['email'] ?? ''));
    $password = $input['password'] ?? '';

    $users = loadUsers();
    $user = null;
    foreach ($users as $u) {
        if ($u['email'] === $email) { $user = $u; break; }
    }

    if (!$user || !password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
        exit;
    }

    $token = createToken($user['id'], $user['email'], $user['role']);
    $secure = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on';
    setcookie('hf_token', $token, [
        'expires' => time() + SESSION_LIFETIME,
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Strict',
        'secure' => $secure
    ]);
    echo json_encode(['success' => true, 'email' => $user['email'], 'role' => $user['role']]);
    exit;
}

if ($path === 'logout' && $method === 'POST') {
    setcookie('hf_token', '', ['expires' => 1, 'path' => '/']);
    echo json_encode(['success' => true]);
    exit;
}

if ($path === 'me' && $method === 'GET') {
    $user = requireAuth();
    echo json_encode(['email' => $user['email'], 'role' => $user['role']]);
    exit;
}

if ($path === 'change-password' && $method === 'POST') {
    $user = requireAuth();
    checkRateLimit('change-password');
    $input = json_decode(file_get_contents('php://input'), true);

    $users = loadUsers();
    $idx = array_search($user['id'], array_column($users, 'id'));
    if ($idx === false || !password_verify($input['currentPassword'] ?? '', $users[$idx]['password'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Current password is incorrect']);
        exit;
    }
    $newPass = $input['newPassword'] ?? '';
    if (strlen($newPass) < 8) {
        http_response_code(400);
        echo json_encode(['error' => 'Password must be at least 8 characters']);
        exit;
    }
    $users[$idx]['password'] = password_hash($newPass, PASSWORD_BCRYPT, ['cost' => 12]);
    saveUsers($users);
    echo json_encode(['success' => true]);
    exit;
}

if ($path === 'forgot-password' && $method === 'POST') {
    checkRateLimit('forgot-password');
    $input = json_decode(file_get_contents('php://input'), true);
    $email = strtolower(trim($input['email'] ?? ''));

    $users = loadUsers();
    foreach ($users as &$u) {
        if ($u['email'] === $email) {
            $resetToken = bin2hex(random_bytes(32));
            $u['resetToken'] = password_hash($resetToken, PASSWORD_BCRYPT, ['cost' => 10]);
            $u['resetExpires'] = time() + 3600;
            saveUsers($users);

            $resetUrl = BASE_URL . '/hf-manage/?reset=' . $resetToken . '&email=' . urlencode($email);

            // Log reset link (SMTP can be added later)
            $logFile = DATA_DIR . '/reset_links.log';
            file_put_contents($logFile, date('c') . " Reset for $email: $resetUrl\n", FILE_APPEND);

            break;
        }
    }
    // Always return success to prevent email enumeration
    echo json_encode(['success' => true]);
    exit;
}

if ($path === 'reset-password' && $method === 'POST') {
    checkRateLimit('reset-password');
    $input = json_decode(file_get_contents('php://input'), true);
    $email = strtolower(trim($input['email'] ?? ''));
    $token = $input['token'] ?? '';
    $newPass = $input['newPassword'] ?? '';

    if (strlen($newPass) < 8) {
        http_response_code(400);
        echo json_encode(['error' => 'Password must be at least 8 characters']);
        exit;
    }

    $users = loadUsers();
    foreach ($users as &$u) {
        if ($u['email'] === $email && !empty($u['resetToken']) && ($u['resetExpires'] ?? 0) > time()) {
            if (password_verify($token, $u['resetToken'])) {
                $u['password'] = password_hash($newPass, PASSWORD_BCRYPT, ['cost' => 12]);
                unset($u['resetToken'], $u['resetExpires']);
                saveUsers($users);
                echo json_encode(['success' => true]);
                exit;
            }
        }
    }
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or expired reset link']);
    exit;
}

// --- ADMIN MANAGEMENT ---
if ($path === 'admins' && $method === 'GET') {
    requireSuperadmin();
    $users = loadUsers();
    $result = array_map(fn($u) => [
        'id' => $u['id'], 'email' => $u['email'],
        'role' => $u['role'], 'createdAt' => $u['createdAt'] ?? ''
    ], $users);
    echo json_encode(array_values($result));
    exit;
}

if ($path === 'admins' && $method === 'POST') {
    requireSuperadmin();
    $input = json_decode(file_get_contents('php://input'), true);
    $email = strtolower(trim($input['email'] ?? ''));
    $password = $input['password'] ?? '';

    if (!$email || strlen($password) < 8) {
        http_response_code(400);
        echo json_encode(['error' => 'Valid email and password (8+ chars) required']);
        exit;
    }

    $users = loadUsers();
    foreach ($users as $u) {
        if ($u['email'] === $email) {
            http_response_code(409);
            echo json_encode(['error' => 'User already exists']);
            exit;
        }
    }

    $newUser = [
        'id' => bin2hex(random_bytes(16)),
        'email' => $email,
        'password' => password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]),
        'role' => 'admin',
        'createdAt' => date('c')
    ];
    $users[] = $newUser;
    saveUsers($users);
    echo json_encode(['success' => true, 'id' => $newUser['id']]);
    exit;
}

if (preg_match('#^admins/(.+)$#', $path, $m) && $method === 'DELETE') {
    $currentUser = requireSuperadmin();
    $targetId = $m[1];

    if ($targetId === $currentUser['id']) {
        http_response_code(400);
        echo json_encode(['error' => 'Cannot delete yourself']);
        exit;
    }

    $users = loadUsers();
    $target = null;
    foreach ($users as $u) { if ($u['id'] === $targetId) { $target = $u; break; } }

    if (!$target) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
        exit;
    }

    if ($target['role'] === 'superadmin') {
        $superCount = count(array_filter($users, fn($u) => $u['role'] === 'superadmin'));
        if ($superCount <= 1) {
            http_response_code(400);
            echo json_encode(['error' => 'Cannot delete the last superadmin']);
            exit;
        }
    }

    $users = array_values(array_filter($users, fn($u) => $u['id'] !== $targetId));
    saveUsers($users);
    echo json_encode(['success' => true]);
    exit;
}

// --- SITE DATA ---
if ($path === 'data' && $method === 'GET') {
    requireAuth();
    echo json_encode(loadSiteData());
    exit;
}

if ($path === 'data' && $method === 'POST') {
    requireAuth();
    $input = json_decode(file_get_contents('php://input'), true);
    if ($input) {
        file_put_contents(SITE_DATA_FILE, json_encode($input, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(['success' => true]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data']);
    }
    exit;
}

// --- IMAGES ---
if ($path === 'images' && $method === 'GET') {
    requireAuth();
    $files = glob(IMAGES_DIR . '/*.{avif,jpg,jpeg,png,webp}', GLOB_BRACE);
    $result = array_map(fn($f) => 'images/' . basename($f), $files);
    echo json_encode(array_values($result));
    exit;
}

if ($path === 'images/upload' && $method === 'POST') {
    requireAuth();
    $uploaded = [];
    if (!empty($_FILES['photos'])) {
        $files = $_FILES['photos'];
        $count = is_array($files['name']) ? count($files['name']) : 1;

        for ($i = 0; $i < $count; $i++) {
            $name = is_array($files['name']) ? $files['name'][$i] : $files['name'];
            $tmp = is_array($files['tmp_name']) ? $files['tmp_name'][$i] : $files['tmp_name'];
            $error = is_array($files['error']) ? $files['error'][$i] : $files['error'];

            if ($error !== UPLOAD_ERR_OK) continue;

            $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
            if (!in_array($ext, ['avif', 'jpg', 'jpeg', 'png', 'webp'])) continue;

            $safeName = preg_replace('/[^a-zA-Z0-9_-]/', '-', pathinfo($name, PATHINFO_FILENAME));
            $newName = $safeName . '-' . base_convert(time(), 10, 36) . '.' . $ext;
            $dest = IMAGES_DIR . '/' . $newName;

            if (move_uploaded_file($tmp, $dest)) {
                $uploaded[] = 'images/' . $newName;
            }
        }
    }
    echo json_encode(['success' => true, 'files' => $uploaded]);
    exit;
}

if (preg_match('#^images/([^/]+)$#', $path, $m) && $method === 'DELETE') {
    requireAuth();
    $filename = basename($m[1]); // Prevent path traversal
    $filepath = IMAGES_DIR . '/' . $filename;

    if (!file_exists($filepath)) {
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
        exit;
    }
    unlink($filepath);
    echo json_encode(['success' => true]);
    exit;
}

// 404 fallback
http_response_code(404);
echo json_encode(['error' => 'Not found', 'path' => $path]);
