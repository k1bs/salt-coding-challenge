import React from 'react'

import { Link } from 'react-router-dom'

const Header = (props) => (
  <nav className='navbar navbar-expand navbar-dark bg-dark'>
    <span className='navbar-brand'>App Title</span>
    <div className='collapse navbar-collapse' id='navbarNav'>
      <ul className='nav navbar-nav'>
        <li className='nav-item'><Link className='nav-link' to='/dashboard'>Dashboard</Link></li>
        {!props.auth && <li className='nav-item'><Link className='nav-link' to='/register'>Register</Link></li>}
        {!props.auth && <li className='nav-item'><Link className='nav-link' to='/login'>Login</Link></li>}
        {props.auth && <li className='nav-item'><span className='nav-link logout' onClick={props.logout}>Logout</span></li>}
      </ul>
    </div>
  </nav>
)

export default Header
