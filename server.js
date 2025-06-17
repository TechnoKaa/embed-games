const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to existing SQLite DB file
const db = new sqlite3.Database('./games.db', err => {
  if (err) {
    console.error('Could not connect to DB', err.message);
    process.exit(1);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: '7hfoasdhfoh3aul3haf9b7cmer',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
}));

// Admin check middleware
function requireAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
}

// Serve admin login page
app.get('/admin', (req, res) => {
  if (req.session && req.session.isAdmin) {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
  } else {
    res.sendFile(path.join(__dirname, 'public', 'admin-login.html'));
  }
});


// Admin login POST
app.post('/admin/login', (req, res) => {
  const { password } = req.body;
  const ADMIN_PASSWORD = 'admin123'; // change as needed

  if (password === ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// Admin logout GET
app.post('/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});


// Public API to get all games
app.get('/api/games', (req, res) => {
  db.all('SELECT * FROM games ORDER BY id ASC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ games: rows });
  });
});

// Admin-only API to add a new game
app.post('/api/games', requireAdmin, (req, res) => {
  const { name, url, image } = req.body;
  if (!name || !url || !image) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const sql = 'INSERT INTO games (name, url, image) VALUES (?, ?, ?)';
  db.run(sql, [name, url, image], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, url, image });
  });
});

// Admin-only API to delete a game by ID
app.delete('/api/games/:id', requireAdmin, (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM games WHERE id = ?', id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Game not found' });
    res.json({ success: true });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
