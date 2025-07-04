document.getElementById('loginForm').addEventListener('submit', event => {
  event.preventDefault();
  const password = document.getElementById('passwordInput').value;

  fetch('api/login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ password }),
  })
    .then(res => {
      if (!res.ok) throw new Error('Invalid password');
      return res.json();
    })
    .then(() => {
      window.location.href = '/admin.php';
    })
    .catch(err => alert(err.message));
});

// Toggle password visibility using image only
const toggleBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('passwordInput');

toggleBtn.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  toggleBtn.src = isPassword ? 'images/show.png' : 'images/hide.png';
  toggleBtn.alt = isPassword ? 'Hide Password' : 'Show Password';
});
