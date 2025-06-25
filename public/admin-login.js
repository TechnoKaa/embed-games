document.getElementById('loginForm').addEventListener('submit', event => {
  event.preventDefault();
  const password = document.getElementById('passwordInput').value;

  fetch('api/login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin', // IMPORTANT for session cookies
    body: JSON.stringify({ password }),
  })
    .then(res => {
      if (!res.ok) throw new Error('Invalid password');
      return res.json();
    })
    .then(() => {
      window.location.href = '/admin.php'; // redirect to admin dashboard
    })
    .catch(err => alert(err.message));
});
