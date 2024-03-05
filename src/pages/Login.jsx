import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import {login} from '../api/auth.api'
import { AuthContext } from "../context/auth.context"
import fullLogo from '../assets/img/logo+slogan.png';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const {storeToken, authenticateUser} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {email, password}

        try {
            // login response with the jwt token
          const response = await login (user)
          storeToken(response.data.authToken)
          authenticateUser()
          navigate('/Home')
        } catch (error) {
            console.log("error logging in", error)
            setError(error.response.data.message)
        }
    }

    return (
        <div>

        <div className="logo-container">
            <img src={fullLogo} alt="fuel-logo" />
        </div>

        <div className="login-form">

            <form onSubmit={handleSubmit}>

            <input
            type="email"
            name="email"
            value={email}
            placeholder="email"
            onChange={({target}) => setEmail(target.value)} />

            <input
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={({target}) => setPassword(target.value)} />

            <Link to="/home" className="login-button" onClick={handleSubmit}>Log In</Link>

            </form>

            {error && <p>{error}</p>}
        </div>
        </div>
    )
}

export default Login