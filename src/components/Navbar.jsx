import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/theme.context';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import logoutIcon from '../assets/img/logout-icon.png';
import settingsIcon from '../assets/img/settings-icon.png'
import defaultProfileImg from '../assets/img/user-default-icon.png'

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

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
            <img src={settingsIcon} alt="settings" />
          </button>
          <button className='nav-bttn' onClick={logoutUser}>
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
