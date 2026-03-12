let users = []; // This will be loaded from users.json

// Load users.json (SPCK allows fetching local JSON)
fetch('users.json')
  .then(res => res.json())
  .then(data => users = data)
  .catch(err => console.log('No users yet', err));

function showRegister() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
  document.getElementById('message').innerText = '';
}

function showLogin() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('message').innerText = '';
}

function register() {
  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value.trim();

  if (!username || !password) {
    document.getElementById('message').innerText = 'Please fill all fields';
    return;
  }

  if (users.some(u => u.username === username)) {
    document.getElementById('message').innerText = 'Username already exists';
    return;
  }

  const newUser = { username, password, cart: [] };
  users.push(newUser);

  // Save back to users.json (in SPCK you can overwrite files)
  // For SPCK you may need to manually save the file or use localStorage
  localStorage.setItem('users', JSON.stringify(users));

  document.getElementById('message').innerText = 'Account created! You can login now.';
  showLogin();
}

function login() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'bookstore.html';
  } else {
    document.getElementById('message').innerText = 'Invalid username or password';
  }
}