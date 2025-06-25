// Load a game URL into the iframe and scroll to top smoothly
function loadGame(url) {
  const iframe = document.getElementById('gameFrame');
  iframe.src = url;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Create clickable game cards from an array of games
function createGameCards(games) {
  const container = document.getElementById('gameCardsContainer');
  container.innerHTML = ''; // Clear existing cards

  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';

    const img = document.createElement('img');
    img.src = game.image;
    img.alt = game.name;

    const title = document.createElement('h3');
    title.textContent = game.name;

    card.appendChild(img);
    card.appendChild(title);

    // When clicked, load the game in the iframe
    card.onclick = () => loadGame(game.url);

    container.appendChild(card);
  });
}

// Fetch games from the server and display them
function fetchGames() {
  fetch('/api/games.php')
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch games');
      return response.json();
    })
    .then(data => {
      if (data.games && data.games.length > 0) {
        createGameCards(data.games);

        // Load the first game by default in the iframe
        loadGame(data.games[0].url);
      } else {
        document.getElementById('gameCardsContainer').textContent = 'No games available.';
      }
    })
    .catch(error => {
      console.error('Error fetching games:', error);
      document.getElementById('gameCardsContainer').textContent = 'Error loading games.';
    });
}

// Fullscreen toggle
document.getElementById('fullscreenBtn').addEventListener('click', () => {
  const playground = document.getElementById('playground');

  if (!document.fullscreenElement) {
    playground.requestFullscreen().catch(err => {
      alert(`Error attempting fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});


// When the DOM is fully loaded, fetch and display games
document.addEventListener('DOMContentLoaded', () => {
  fetchGames();
});
