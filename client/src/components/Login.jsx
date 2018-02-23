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
      <div>
        <form onSubmit={(e) => this.props.handleLoginSubmit(e, this.state)}>
          <div className='form-group'>
            <input type='text' name='username' className='form-control' value={this.state.username} placeholder='Username' onChange={this.handleInputChange} />

          </div>
          <input type='password' name='password' value={this.state.password} placeholder='Password' onChange={this.handleInputChange} />
          <input type='submit' value='Log In' />
        </form>
      </div>
    )
  }
}

export default Login
