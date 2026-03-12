import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-top">
      <div className="logo">VERDICT</div>
      <nav className="sidebar-links">
        <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Dashboard</NavLink>
        <NavLink to="/users" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>View Users</NavLink>
        <NavLink to="/chat" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Chat</NavLink>
        <NavLink to="/login" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Login</NavLink>
        <NavLink to="/signup" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Signup</NavLink>
      </nav>
    </div>
    <div className="sidebar-spacer" />
    <button className="logout" type="button">Logout</button>
  </aside>
);

export default Sidebar;
