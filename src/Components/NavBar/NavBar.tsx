import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '../../theme/ThemeContext';

function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <nav className="dynamic-island-navbar" aria-label="Site">
      <span className="dynamic-island-title">Aryan Ved</span>
      <button
        type="button"
        className="theme-toggle-btn"
        aria-label="Dark mode"
        aria-pressed={isDark}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={toggleTheme}
      >
        {isDark ? <DarkModeIcon fontSize="medium" aria-hidden /> : <LightModeIcon fontSize="medium" aria-hidden />}
      </button>
    </nav>
  );
}

export default NavBar;
