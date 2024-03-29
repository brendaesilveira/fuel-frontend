import { Link, useNavigate } from 'react-router-dom';
import { SettingsContext } from '../context/settings.context';
import { useContext, useState } from 'react';
import logoutIcon from '../assets/img/logout-icon.png';
import settingsIcon from '../assets/img/settings-icon.png'
import defaultProfileImg from '../assets/img/user-default-icon.png'
import Settings from './Settings';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  const {  toggleSettings } = useContext(SettingsContext);
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <nav className={`Navbar`}>
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
          <button className='nav-bttn' onClick={toggleSettings}>
              <img src={settingsIcon} alt="settings" />
            </button>
            <button className='nav-bttn' onClick={handleLogout}>
              <img src={logoutIcon} alt="logout" />
            </button>
          </div>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}

export default Navbar;