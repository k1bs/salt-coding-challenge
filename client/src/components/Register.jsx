import React, { Component } from 'react'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      email: ''
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
        <form onSubmit={(e) => this.props.handleRegisterSubmit(e, this.state)}>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input id='username' type='text' className='form-control' name='username' value={this.state.username} placeholder='Username' onChange={this.handleInputChange} />
          </div>
          <div className='form-group' >
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' className='form-control' name='password' value={this.state.password} placeholder='Password' onChange={this.handleInputChange} />
          </div>
          <div className='form-group' >
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' className='form-control' name='email' value={this.state.email} placeholder='Email' onChange={this.handleInputChange} />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
      </div>
    )
  }
}

export default Register
