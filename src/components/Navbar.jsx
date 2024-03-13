import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/theme.context';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import logoutIcon from '../assets/img/logout-icon.png';
import settingsIcon from '../assets/img/settings-icon.png'
import defaultProfileImg from '../assets/img/user-default-icon.png'
import Settings from './Settings';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  return (
    <nav className={`Navbar ${theme}`}>
       {isLoggedIn && user ? (
        <>
          {user.profilePicture ? (
            <img className='profileImg' src={user.profilePicture} alt="profile-picture" />
          ) : (
            <img className='profileImg' src={defaultProfileImg} alt="profile-img" />
          )}
          <Link className='user-name' to={`/profile/${user.userCode}`}>
            {user.name}
          </Link>
          <div className='nav-bttns-container'>
          <button className='nav-bttn'>
            <img onClick={handleSettingsClick} src={settingsIcon} alt="settings" />
          </button>
          <button className='nav-bttn'>
            <img onClick={logoutUser} src={logoutIcon} alt="logout" />
          </button>
          </div>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
      {showSettings}
    </nav>
  );
}

export default Navbar;
