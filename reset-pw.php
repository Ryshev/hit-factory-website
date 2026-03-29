<?php
$file = '/home/hitfstmo/public_html/hf-manage/data/users.json';
$users = json_decode(file_get_contents($file), true);
$users[0]['password'] = password_hash('HitFactory2026!', PASSWORD_BCRYPT, ['cost' => 12]);
$users[1]['password'] = password_hash('AnriAdmin2026!', PASSWORD_BCRYPT, ['cost' => 12]);
file_put_contents($file, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
echo "OK";
