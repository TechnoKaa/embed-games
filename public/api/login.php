<?php
session_start();
header('Content-Type: application/json');

$envPath = __DIR__ . '/../../.env';
if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($key, $value) = explode('=', $line, 2);
        $value = trim($value, " \t\n\r\0\x0B\"'");
        $_ENV[trim($key)] = $value;
    }
}

$ADMIN_PASSWORD = $_ENV['ADMIN_PASSWORD'] ?? 'admin123';

switch ($_SERVER['REQUEST_METHOD']) {
  case 'POST':
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || !isset($input['password'])) {
      http_response_code(400);
      echo json_encode(['error' => 'Missing password']);
      exit;
    }

    if ($input['password'] === $ADMIN_PASSWORD) {
      $_SESSION['isAdmin'] = true;
      echo json_encode(['success' => true]);
    } else {
      http_response_code(401);
      echo json_encode(['error' => 'Invalid password']);
    }
    break;

  case 'DELETE':
    session_destroy();
    echo json_encode(['success' => true]);
    break;

  default:
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    break;
}
