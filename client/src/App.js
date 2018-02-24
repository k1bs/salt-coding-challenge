import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import fetch from 'cross-fetch'

import Footer from './components/Footer'
import Home from './components/Home'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import NewOrderForm from './components/NewOrderForm'
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
      pricesInUSD: {
        BTC: null,
        LTC: null,
        DOGE: null,
        XMR: null
      },
      orderDataLoaded: false,
      pricesDataLoaded: false,
      orderJustSubmitted: false
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleRegisterSubmit = this.handleLoginSubmit.bind(this)
    this.handleNewOrderSubmit = this.handleNewOrderSubmit.bind(this)
    this.orderResetter = this.orderResetter.bind(this)
    this.logout = this.logout.bind(this)
    this.getOrders = this.getOrders.bind(this)
    this.getPrices = this.getPrices.bind(this)
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

  handleNewOrderSubmit (e, data) {
    e.preventDefault()
    fetch('/api/orders/create', {
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
          orderJustSubmitted: true
        })
      }).catch((err) => console.log(err))
  }

  orderResetter () {
    this.setState({
      orderJustSubmitted: false
    })
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

  getPrices () {
    fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,LTC,DOGE,XMR&tsyms=USD')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          pricesInUSD: {
            BTC: json.BTC.USD,
            LTC: json.LTC.USD,
            DOGE: json.DOGE.USD,
            XMR: json.XMR.USD
          },
          pricesDataLoaded: true
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
            <Route exact path='/neworder' render={() => (
              !this.state.auth
                ? <Redirect to='/login' />
                : this.state.orderJustSubmitted
                  ? <Redirect to='/dashboard' />
                  : <NewOrderForm handleNewOrderSubmit={this.handleNewOrderSubmit}
                    balances={this.state.balances}
                    pricesInUSD={this.state.pricesInUSD} />
            )} />
            <Route exact path='/dashboard' render={() => (
              !this.state.auth
                ? <Redirect to='/login' />
                : <Dashboard getOrders={this.getOrders}
                  orderResetter={this.orderResetter}
                  getPrices={this.getPrices}
                  balances={this.state.balances}
                  pricesInUSD={this.state.pricesInUSD}
                  orderDataLoaded={this.state.orderDataLoaded}
                  pricesDataLoaded={this.state.pricesDataLoaded} />
            )} />
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
