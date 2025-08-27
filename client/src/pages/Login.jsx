import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, isLoggedIn } from '/src/lib/auth.js'; // only import what you need

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }); // login uses auth.js
      if (res.token) {
        setMessage('Login successful!');
        navigate('/dashboard'); // redirect to dashboard
      } else {
        setMessage(res.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong');
    }
  };

  // Redirect if already logged in
  if (isLoggedIn()) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" style={{ padding: 8, width: '100%' }}>Login</button>
      </form>

      <p style={{ marginTop: 12 }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>

      {message && <p style={{ color: 'red', marginTop: 8 }}>{message}</p>}
    </div>
  );
}
