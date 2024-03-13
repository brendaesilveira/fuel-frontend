import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { login } from '../api/auth.api';
import { AuthContext } from "../context/auth.context";
import fullLogo from '../assets/img/logo+slogan.png';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { email, password };

        try {
            const response = await login(user);
            console.log(user)
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
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="password"
                        className="login-input"
                        onChange={({ target }) => setPassword(target.value)} />
                    <button type="submit" className="login-button">Log In</button>
                </form>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default Login;