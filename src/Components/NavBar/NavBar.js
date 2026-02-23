import * as React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function NavBar({ theme, setTheme }) {
  return (
    <div className="dynamic-island-navbar">
      <button
        className={`theme-toggle-btn left${theme === 'light' ? ' active' : ''}`}
        aria-label="Light mode"
        onClick={() => setTheme('light')}
      >
        <LightModeIcon fontSize="medium" />
      </button>
      <span className="dynamic-island-title">Aryan Ved</span>
      <button
        className={`theme-toggle-btn right${theme === 'dark' ? ' active' : ''}`}
        aria-label="Dark mode"
        onClick={() => setTheme('dark')}
      >
        <DarkModeIcon fontSize="medium" />
      </button>
    </div>
  );
}
export default NavBar;