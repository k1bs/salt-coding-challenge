import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import fetch from 'cross-fetch'

import Footer from './components/Footer'
import Home from './components/Home'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      auth: false,
      user: null,
      orders: [],
      balances: {
        USD: null,
        BTC: null,
        LTC: null,
        DOGE: null,
        XMR: null
      },
      orderDataLoaded: false
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleRegisterSubmit = this.handleLoginSubmit.bind(this)
    this.logout = this.logout.bind(this)
    this.getOrders = this.getOrders.bind(this)
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

  getOrders () {
    fetch('/api/orders', {
      credentials: 'include'
    }).then((res) => res.json())
      .then((json) => {
        console.log(json)
        this.setState({
          orderDataLoaded: true,
          orders: json.data.orders,
          balances: json.data.balances
        })
      }).catch((err) => console.log(err))
  }

  logout () {
    fetch('/api/auth/logout', {
      credentials: 'include'
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
          <Header logout={this.logout} auth={this.state.auth} />
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' render={() => (
              this.state.auth
                ? <Redirect to='/dashboard' />
                : <Login handleLoginSubmit={this.handleLoginSubmit} />
            )} />
            <Route exact path='/register' render={() => (
              this.state.auth
                ? <Redirect to='/dashboard' />
                : <Register handleRegisterSubmit={this.handleRegisterSubmit} />
            )} />
            <Route exact path='/dashboard' render={() => (
              !this.state.auth
                ? <Redirect to='/login' />
                : <Dashboard getOrders={this.getOrders} balances={this.state.balances} orderDataLoaded={this.state.orderDataLoaded} />
            )} />
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
