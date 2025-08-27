// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { isLoggedIn } from './lib/auth';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route
          path="/login"
          element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* Register page */}
        <Route
          path="/register"
          element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Register />}
        />

        {/* Dashboard page (protected route) */}
        <Route
          path="/dashboard"
          element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
