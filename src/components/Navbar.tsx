import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <header className='header-wrapper'>
        <Link  to="/login" >Login</Link>
    </header>
  )
}

export default Navbar
