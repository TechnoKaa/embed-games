# embed-games

A simple and responsive web application for embedding and managing mini web games using PHP and SQLite.

🌐 Live site: [https://games.fklavye.net](https://games.fklavye.net)

---

## Features

- Embedded game player using `<iframe>`
- Clickable game cards with thumbnails
- Admin dashboard (password protected)
  - Add new games (name, image path, URL)
  - Delete existing games
- SQLite database for storing game data
- Vanilla CSS and JavaScript

---

## Technologies

- PHP
- SQLite
- HTML
- CSS
- JavaScript (ES6)

---

## Admin Access

- Visit: `/admin.php`
- Password is set in `public/api/login.php`:
  ```php
  $ADMIN_PASSWORD = 'admin123'; // Change this in production
