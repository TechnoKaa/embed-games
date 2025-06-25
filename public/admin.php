<?php
session_start();
if (!isset($_SESSION['isAdmin']) || !$_SESSION['isAdmin']) {
    header("Location: /admin-login.html");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Admin Dashboard</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <div class="admin-header">
      <h2>Admin Dashboard</h2>
      <button id="logoutBtn">Logout</button>
    </div>

    <form id="addGameForm" class="add-game-form">
      <input name="name" type="text" placeholder="Game name" required />
      <input name="url" type="url" placeholder="Game iframe URL" required />
      <input name="image" type="text" placeholder="Game image (local path)" required />
      <button type="submit">Add Game</button>
    </form>

    <div id="gameCardsContainer" class="game-cards-grid"></div>
  </div>

  <script src="admin.js"></script>
</body>
</html>