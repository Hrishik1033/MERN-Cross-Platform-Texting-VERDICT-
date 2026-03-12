/*import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', pass: '' });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Authenticating...');
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.message || 'Login response received');
      if (res.ok && data.message === 'Login successful') {
        onLogin?.();
        navigate('/chat', { replace: true });
      }
    } catch (err) {
      setStatus('Network error, please try again');
    }
  };

  return (
    <section className="auth-page">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input
          name="pass"
          type="password"
          placeholder="Password"
          value={form.pass}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {status && <p className="status">{status}</p>}
    </section>
  );
};

export default Login;*/
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || window.location.origin;

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', pass: '' });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Authenticating...');
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.message || 'Login response received');
      if (res.ok && data.message === 'Login successful') {
        onLogin?.();
        navigate('/chat', { replace: true });
      }
    } catch (err) {
      setStatus('Network error, please try again');
    }
  };

  return (
    <div className="login-container">
      <h1 className="logo">FocusSpace</h1>
      <p className="tagline">Protect your attention</p>
      <form onSubmit={handleSubmit} autoComplete="on">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          name="pass"
          type="password"
          placeholder="Password"
          value={form.pass}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button className="login-btn" type="submit">Login</button>
      </form>
      <p className="bottom-text">
        Don&apos;t have an account? <span onClick={() => navigate('/signup')}>Create account</span>
      </p>
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default Login;


