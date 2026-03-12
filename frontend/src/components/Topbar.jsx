import { NavLink } from 'react-router-dom';

const Topbar = () => (
  <div className="topbar">
    <h1>VERDICT</h1>
    <nav className="nav-links">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/users">View Users</NavLink>
      <NavLink to="/chat">Chat</NavLink>
    </nav>
  </div>
);

export default Topbar;
