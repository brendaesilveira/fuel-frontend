import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/theme.context';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn, logoutUser} = useContext(AuthContext);
  // console.log(context);
  return (
    <nav className={`Navbar ${theme}`}>
      <Link to='/'>
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to='/projects'>
            <button>Projects</button>
          </Link>
          <Link to='/projects/create'>
            <button>Create Project</button>
          </Link>
          <button onClick={logoutUser}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to='/signup'>
            <button>Signup</button>
          </Link>
          <Link to='/login'>
            <button>Login</button>
          </Link>
        </>
      )}

      <button onClick={toggleTheme}>
        {theme === 'light' ? 'dark' : 'light'}
      </button>
    </nav>
  );
}

export default Navbar;