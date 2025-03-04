import { useContext } from 'react';
import { ThemeContext } from '../theme';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../button';
import { useDispatch } from 'react-redux';
import { logOut } from '../../features/user/userSlice';

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/auth');
    localStorage.removeItem('token');
  };

  return (
    <div className="navbar bg-base-100 gap-5 shadow-sm">
      <div className="flex-1">
        <Link to={'/'} className="btn btn-ghost text-xl">
          Social network
        </Link>
      </div>
      <div className="">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <div className="flex-none">
        <button onClick={toggleTheme} className="btn btn-circle">
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </div>
  );
};
