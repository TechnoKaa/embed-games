function createGameCards(games) {
  const container = document.getElementById('gameCardsContainer');
  container.innerHTML = '';

  // to show games in descending order (oldest first) add .slice().reverse()
  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';

    const img = document.createElement('img');
    img.src = game.image; // assume local path like 'images/chess.jpg'
    img.alt = game.name;

    const title = document.createElement('h3');
    title.textContent = game.name;

    card.append(img, title);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.onclick = e => {
      e.stopPropagation();
      deleteGame(game.id);
    };
    card.append(delBtn);

    container.appendChild(card);
  });
}

function fetchGames() {
  fetch('/api/games.php', { credentials: 'same-origin' })
    .then(res => res.json())
    .then(data => createGameCards(data.games))
    .catch(console.error);
}

function addGame(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    name: form.name.value.trim(),
    url: form.url.value.trim(),
    image: form.image.value.trim(), // local path expected here
  };

  fetch('/api/games.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(data),
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to add game');
      return res.json();
    })
    .then(() => {
      form.reset();
      fetchGames();
    })
    .catch(err => alert(err.message));
}

function deleteGame(id) {
  fetch(`/api/games.php?id=${id}`, {
    method: 'DELETE',
    credentials: 'same-origin',
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to delete game');
      return res.json();
    })
    .then(() => fetchGames())
    .catch(err => alert(err.message));
}

function logout() {
  fetch('/api/login.php', {
    method: 'DELETE',
    credentials: 'same-origin',
  })
    .then(() => {
      window.location.href = '/'; // redirect to main page after logout
    });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchGames();
  document.getElementById('addGameForm').addEventListener('submit', addGame);
  document.getElementById('logoutBtn').addEventListener('click', logout);
});
