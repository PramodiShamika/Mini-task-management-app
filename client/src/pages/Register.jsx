// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register, isLoggedIn } from '/src/lib/auth.js';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password });
      if (res.token) {
        setMessage('Registration successful!');
        navigate('/dashboard');
      } else {
        setMessage(res.error || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong');
    }
  };

  // If already logged in, redirect to dashboard
  if (isLoggedIn()) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <button type="submit" style={{ padding: 8, width: '100%' }}>Register</button>
      </form>

      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>

      {message && <p style={{ color: 'red', marginTop: 8 }}>{message}</p>}
    </div>
  );
}
