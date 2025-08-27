// src/lib/auth.js

// Register a new user
export function register(userData) {
  return fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  }).then(res => res.json());
}

// Login existing user
export function login(credentials) {
  return fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  });
}

// Check if user is logged in
export function isLoggedIn() {
  return !!localStorage.getItem('token');
}

// Logout user
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
