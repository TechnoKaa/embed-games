<?php
session_start();

header('Content-Type: application/json');

$db = new SQLite3(__DIR__ . '/../../games.db');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $results = $db->query("SELECT * FROM games ORDER BY id ASC");
  $games = [];
  while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
    $games[] = $row;
  }
  echo json_encode(['games' => $games]);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!isset($_SESSION['isAdmin']) || !$_SESSION['isAdmin']) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
  }

  $data = json_decode(file_get_contents('php://input'), true);

  if (!isset($data['name'], $data['url'], $data['image'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing fields']);
    exit;
  }

  $stmt = $db->prepare("INSERT INTO games (name, url, image) VALUES (:name, :url, :image)");
  $stmt->bindValue(':name', $data['name']);
  $stmt->bindValue(':url', $data['url']);
  $stmt->bindValue(':image', $data['image']);
  $stmt->execute();

  echo json_encode(['success' => true]);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  if (!isset($_SESSION['isAdmin']) || !$_SESSION['isAdmin']) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
  }

  $id = isset($_GET['id']) ? intval($_GET['id']) : 0;


  if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid ID']);
    exit;
  }

  $stmt = $db->prepare("DELETE FROM games WHERE id = :id");
  $stmt->bindValue(':id', $id);
  $stmt->execute();

  echo json_encode(['success' => true]);
  exit;
}
