import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { login } from '../api/auth.api';
import { AuthContext } from "../context/auth.context";
import fullLogo from '../assets/img/logo+slogan.png';
import closedEye from '../assets/img/closed-eye.png';
import openedEye from '../assets/img/opened-eye.png';
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { email, password };

        try {
            const response = await login(user);
            storeToken(response.data.authToken);
            authenticateUser();

            if (user.setupCompleted) {
                navigate('/setup');
            } else {
                navigate('/home');
            }
        } catch (error) {
            console.log("error logging in", error);
            setError(error.response.data.message);
        }
    };

    return (
        <div style={{ backgroundColor: '#fff6ea' }}>
            <div className="logo-container">
                <img src={fullLogo} alt="fuel-logo" />
            </div>
            <div className="login-form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="email"
                        className="login-input"
                        onChange={({ target }) => setEmail(target.value)} />
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            placeholder="password"
                            className="login-input"
                            onChange={({ target }) => setPassword(target.value)} />
                        <img
                            src={showPassword ? openedEye : closedEye}
                            alt="toggle-password"
                            className="toggle-password-icon"
                            onClick={togglePasswordVisibility}
                        />
                    </div>
                    <button type="submit" className="login-button">Log In</button>
                    <Link className="navigation-link" to={'/'}>Back</Link>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
