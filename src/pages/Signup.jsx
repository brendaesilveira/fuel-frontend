import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {signup} from '../api/auth.api'
import fullLogo from '../assets/img/logo+slogan.png';

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {email, password, name}

        try {
            await signup(user)
            navigate('/login')
        } catch (error) {
            console.log("Error signing up", error)
             setError(error.response.data.message)
        }
    }

    return (
        <div style={{ backgroundColor: '#fff6ea' }}>

        <div className="logo-container">
        <img src={fullLogo} alt="fuel-logo" />
        </div>

        <div className="signup-form">
        <form className="signup-form" onSubmit={handleSubmit}>

            <label className="signup-label">Name:</label>
            <input className="signup-input" type="name" name="name" value={name} onChange={({target}) => setName(target.value)} />

            <label className="signup-label">Email:</label>
            <input className="signup-input" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label className="signup-label">Password:</label>
            <input className="signup-input" type="password" name="password" value={password} onChange={({target}) => setPassword(target.value)} />
            <p className="pass-requirements">Must contain at least 1 lower case letter,1 upper case letter and 1 number</p>

            <button className="signup-button" type="submit">Create account</button>

            <Link className="navigation-link" to={'/login'}>Already have an account?</Link>
        </form>

        {error && (<p>{error}</p>)}
        </div>

        </div>
    )
}

export default Signup