import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
  componentDidMount () {
    this.props.getOrders()
    this.props.getPrices()
    this.props.orderResetter()
    window.setInterval(() => {
      this.props.getPrices()
    }, 20000)
  }

  renderBalanceData () {
    return (
      <div>
        <h2>Balances</h2>
        <h4>BTC: {this.props.balances.BTC}</h4>
      </div>
    )
  }

  renderTotalValue () {
    let valuesArr = [
      {
        name: 'BTC',
        balance: this.props.balances.BTC,
        valueInUSD: (this.props.balances.BTC * this.props.pricesInUSD.BTC)
      },
      {
        name: 'LTC',
        balance: this.props.balances.LTC,
        valueInUSD: (this.props.balances.LTC * this.props.pricesInUSD.LTC)
      },
      {
        name: 'DOGE',
        balance: this.props.balances.DOGE,
        valueInUSD: (this.props.balances.DOGE * this.props.pricesInUSD.DOGE)
      },
      {
        name: 'XMR',
        balance: this.props.balances.XMR,
        valueInUSD: (this.props.balances.XMR * this.props.pricesInUSD.XMR)
      },
      {
        name: 'USD',
        balance: this.props.balances.USD,
        valueInUSD: (this.props.balances.USD)
      }
    ]

    let total = (valuesArr.reduce((accum, e) => {
      accum += e.valueInUSD
      return accum
    }, 0)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')

    return (
      <div>
        <h5>Total in USD - ${total}</h5>
        <Link className='btn btn-dark' to='/neworder'>Place New Order</Link>
      </div>
    )
  }

  renderPricing () {
    return (
      <div className='pricing-wrapper'>
        <h5>Prices in USD</h5>
        <div>
          <span>BTC: {this.props.pricesInUSD.BTC}</span>
          <span>LTC: {this.props.pricesInUSD.LTC}</span>
          <span>DOGE: {this.props.pricesInUSD.DOGE}</span>
          <span>XMR: {this.props.pricesInUSD.XMR}</span>
        </div>
        <br />
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.props.pricesDataLoaded
          ? this.renderPricing()
          : <p>Loading</p>
          }
        {this.props.orderDataLoaded
          ? this.renderBalanceData()
          : <p>Loading</p>}
        {this.props.orderDataLoaded && this.props.pricesDataLoaded
          ? this.renderTotalValue()
          : <p>Loading</p>}
      </div>
    )
  }
}

export default Dashboard
