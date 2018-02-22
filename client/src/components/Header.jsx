import React from 'react'

import { Link } from 'react-router-dom'

const Header = (props) => (
  <nav className='navbar navbar-dark bg-dark'>
    <h1 className='navbar-brand'>App Title</h1>
    <ul className='navbar-nav'>
      <li className='nav-item'><Link className='nav-link' to='/'>Home</Link></li>
      {!props.auth && <li className='nav-item'><Link className='nav-link' to='/register'>Register</Link></li>}
      {!props.auth && <li className='nav-item'><Link className='nav-link' to='/login'>Login</Link></li>}
      {props.auth && <li className='nav-item'><span className='nav-link logout' onClick={props.logout}>Logout</span></li>}
    </ul>
  </nav>
)

export default Header
