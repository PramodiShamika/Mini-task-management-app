// src/lib/api.js
const BASE_URL = '/api'; // change this if your backend is hosted elsewhere

// Helper to get auth token
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Generic GET request
const get = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
  });
  return res.json();
};

// Generic POST request
const post = async (endpoint, data) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Generic PATCH request
const patch = async (endpoint, data) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Generic DELETE request
const del = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
  });
  return res.json();
};

// Export as default object
export default { get, post, patch, delete: del };
