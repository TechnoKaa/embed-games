# embed-games

A simple and responsive web application for embedding and managing mini web games. Built with Node.js, Express, SQLite, HTML, CSS, and JavaScript.

## Features

- Embedded game player using `<iframe>`
- Clickable game cards with thumbnails
- Admin dashboard (password protected)
  - Add new games (name, image, URL)
  - Delete existing games
- Uses SQLite to store game data
- Responsive and mobile-friendly layout

## Technologies Used

- HTML
- CSS (vanilla)
- JavaScript (ES6)
- Node.js
- Express.js
- SQLite

## Admin Access

- Visit the `/admin` route to access the admin dashboard.
- Password is defined in `server.js`:

```js
const ADMIN_PASSWORD = 'your-password-here';
```

## 🚀 Setup Instructions

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/TechnoKaa/embed-games.git
cd embed-games

# Install dependencies
npm install

# Start the development server
npm start
```

Visit `http://localhost:3000` in your browser to view the site.
