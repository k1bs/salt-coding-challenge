import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import fetch from 'cross-fetch'

import Footer from './components/Footer'
import Home from './components/Home'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      auth: false,
      user: null
    }
  }

  handleLoginSubmit (e, data) {
    e.preventDefault()
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    }).then((res) => res.json())
      .then((json) => {
        console.log(json)
        this.setState({
          auth: json.auth,
          user: json.data.user
        })
      }).catch((err) => console.log(err))
  }

  handleRegisterSubmit (e, data) {
    e.preventDefault()
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    }).then((res) => res.json())
      .then((json) => {
        console.log(json)
        this.setState({
          auth: json.auth,
          user: json.data.user
        })
      }).catch((err) => console.log(err))
  }

  render () {
    return (
      <Router>
        <div className='App'>
          <Header />
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' render={() => (
              this.state.auth
                ? <Redirect to='/' />
                : <Login handleLoginSubmit={this.handleLoginSubmit} />
            )} />
            <Route exact path='/register' render={() => (
              this.state.auth
                ? <Redirect to='/' />
                : <Register handleRegisterSubmit={this.handleRegisterSubmit} />
            )} />
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
