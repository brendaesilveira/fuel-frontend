import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {signup} from '../api/auth.api'

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
        <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Password</label>
            <input type="password" name="password" value={password} onChange={({target}) => setPassword(target.value)} />

            <label>Name</label>
            <input type="name" name="name" value={name} onChange={({target}) => setName(target.value)} />

            <button type="submit">Sign up</button>
        </form>

        {error && (<p>{error}</p>)}

        <p>Already have an account?</p>
        <Link to={'/login'}>Log in</Link>
        </div>
    )
}

export default Signup