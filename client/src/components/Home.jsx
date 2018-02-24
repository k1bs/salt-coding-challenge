import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  render () {
    console.log(this.props.auth)
    return (
      <div>
        <div className='jumbotron'>
          <h1 className='display-3'>Crypto 101</h1>
          <hr className='my-4' />
          <p>In this class, you will learn the ins and outs of trading with Cryptocurrencies. Each student will be given an imaginary $10,000 to invest. By closely monitoring market prices, a student will be able to grow their virtual wealth. The student with the highest total value by the end of the course will receive a bonus to their final grade!</p>
          {this.props.auth
          ? <Link className='btn btn-primary' to='/dashboard'>Dashboard</Link>
          : <div className='btn-group' >
            <Link className='btn btn-primary' to='/login'>Login</Link>
            <Link className='btn btn-secondary' to='/register'>Register</Link>
          </div>}
        </div>
      </div>
    )
  }
}

export default Home
