/*import { useState } from 'react';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', pass: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Creating account...');
    try {
      const res = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.message || 'Signup response received');
      if (res.ok) {
        alert('User registration successful');
      }
    } catch (err) {
      setStatus('Network error, please try again');
    }
  };

  return (
    <section className="auth-page">
      <h2>Signup</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input
          name="pass"
          type="password"
          placeholder="Password"
          value={form.pass}
          onChange={handleChange}
        />
        <button type="submit">Create Account</button>
      </form>
      {status && <p className="status">{status}</p>}
    </section>
  );
};

export default Signup;*/
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || window.location.origin;

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', pass: '' });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Creating account...');
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.message || 'Signup response received');
      if (res.ok) alert('User registration successful');
    } catch (err) {
      setStatus('Network error, please try again');
    }
  };

  return (
    <div className="register-page">
      <div className="register-image" />
      <div className="register-form">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
          </div>
          <div className="input-group">
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
          </div>
          <div className="input-group">
            <input name="pass" type="password" placeholder="Password" value={form.pass} onChange={handleChange} />
          </div>
          <button type="submit">Create Account</button>
        </form>
        <p>Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
        {status && <p className="status">{status}</p>}
      </div>
    </div>
  );
};

export default Signup;


