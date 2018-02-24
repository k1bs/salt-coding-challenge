import React, { Component } from 'react'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <div className='auth-form'>
        <form onSubmit={(e) => this.props.handleLoginSubmit(e, this.state)}>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input id='username' type='text' name='username' className='form-control' value={this.state.username} placeholder='Username' onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' name='password' className='form-control' value={this.state.password} placeholder='Password' onChange={this.handleInputChange} />
          </div>
          <input type='submit' className='btn btn-primary' value='Log In' />
        </form>
      </div>
    )
  }
}

export default Login
