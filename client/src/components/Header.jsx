import React from 'react'

import { Link } from 'react-router-dom'

const Header = () => (
  <nav className='navbar'>
    <h1 className='navbar-brand'>App Title</h1>
    <ul className='navbar-nav'>
      <li classname='nav-item'><Link className='nav-link' to='/'>Home</Link></li>
    </ul>
  </nav>
)

export default Header
