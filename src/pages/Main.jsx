import React from 'react'
import { Link } from 'react-router-dom'
import Menu from '../components/Menu'

function Main() {
  return (
    <div>
      <button><Link to={'/login'}>Login</Link></button>
      <button><Link to={'/signup'}>Signup</Link></button>
    </div>
  )
}

export default Main