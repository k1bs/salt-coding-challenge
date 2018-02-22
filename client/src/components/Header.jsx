import React from 'react'

import { Link } from 'react-router-dom'

const Header = () => (
  <nav className='navbar navbar-dark bg-dark'>
    <h1 className='navbar-brand'>App Title</h1>
    <ul className='navbar-nav'>
      <li className='nav-item'><Link className='nav-link' to='/'>Home</Link></li>
      <li className='nav-item'><Link className='nav-link' to='/register'>Register</Link></li>
      <li className='nav-item'><Link className='nav-link' to='/login'>Login</Link></li>
    </ul>
  </nav>
)

export default Header
