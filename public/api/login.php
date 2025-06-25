<?php
session_start();
header('Content-Type: application/json');

$ADMIN_PASSWORD = 'admin123'; // Change this!

switch ($_SERVER['REQUEST_METHOD']) {
  case 'POST': // Handle login
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

  case 'DELETE': // Handle logout
    session_destroy();
    echo json_encode(['success' => true]);
    break;

  default:
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    break;
}
