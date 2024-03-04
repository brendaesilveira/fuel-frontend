import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import {login} from '../api/auth.api'
import { AuthContext } from "../context/auth.context"

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
          /* console.log(response.data.authToken) */
          storeToken(response.data.authToken)
          authenticateUser()
          navigate('/')
        } catch (error) {
            console.log("error logging in", error)
            setError(error.response.data.message)
        }
    }

    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

            <label>Email</label>
            <input
            type="email"
            name="email"
            value={email}
            onChange={({target}) => setEmail(target.value)} />

            <label>Password</label>
            <input
            type="password"
            name="password"
            value={password}
            onChange={({target}) => setPassword(target.value)} />

            <button type="submit">Login</button>

            </form>

            {error && <p>{error}</p>}

            <p>Don't have an account yet?</p>
             <Link to={'/signup'}>Signup</Link>
        </div>
    )
}

export default Login