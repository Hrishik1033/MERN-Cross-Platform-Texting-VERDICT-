import { useState } from 'react';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className="header">
      <div className="header-left">
        <div className="search-container">
          <input type="text" placeholder="Search..." />
          <span className="search-icon">🔍</span>
        </div>
        <button className="add-btn" type="button">+ Add Task</button>
      </div>

      <div className="header-right">
        <div className="profile-dropdown">
          <img src="https://i.pravatar.cc/50" alt="avatar" className="avatar" />
          <div className="dropdown-menu">
            <p>Profile</p>
            <p>Settings</p>
            <p>
              Dark Mode{' '}
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
            </p>
            <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
