import { Link } from "react-router-dom"
import fullLogo from '../assets/img/logo+slogan.png';

function Main() {
  return (
    <div className="main-page">

        <div className="logo-container">
            <img src={fullLogo} alt="fuel-logo" />
        </div>
        <div className="mp-buttons">
        <Link to="/login" className="main-login-btn">log in</Link>
        <Link to="/signup" className="main-signup-btn">create an account</Link>
        </div>
        </div>
  )
}

export default Main