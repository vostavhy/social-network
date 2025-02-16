import { useContext } from 'react';
import { ThemeContext } from '../theme';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to={'/'} className="btn btn-ghost text-xl">
          Social network
        </Link>
      </div>
      <div className="flex-none">
        <button onClick={toggleTheme} className="btn btn-circle">
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </div>
  );
};
