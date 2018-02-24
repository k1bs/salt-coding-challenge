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

  renderPortfolio () {
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
        <h3>Portfolio</h3>
        <table className='table table-striped table-dark'>
          <thead>
            <tr>
              <th scope='col'>Currency</th>
              <th className='text-right' scope='col'>Balance</th>
              <th className='text-right' scope='col'>Value in USD</th>
            </tr>
          </thead>
          <tbody>
            {valuesArr.map((e, index) => {
              return (
                <tr key={index}>
                  <td>{e.name}</td>
                  <td className='text-right'>{(e.balance)}</td>
                  <td className='text-right'>{e.valueInUSD}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <h5>Value in USD - ${total}</h5>
        <br />
        <Link className='btn btn-primary' to='/neworder'>Place New Order</Link>
      </div>
    )
  }

  renderPricing () {
    return (
      <div className='pricing-wrapper'>
        <table className='table' >
          <caption>Current Prices in USD</caption>
          <thead>
            <tr>
              <th className='text-center' scope='col'>BTC</th>
              <th className='text-center' scope='col'>LTC</th>
              <th className='text-center' scope='col'>DOGE</th>
              <th className='text-center' scope='col'>XMR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='text-center'>{this.props.pricesInUSD.BTC}</td>
              <td className='text-center'>{this.props.pricesInUSD.LTC}</td>
              <td className='text-center'>{this.props.pricesInUSD.DOGE}</td>
              <td className='text-center'>{this.props.pricesInUSD.XMR}</td>
            </tr>
          </tbody>
        </table>
        <br />
      </div>
    )
  }

  render () {
    return (
      <div className='dash-container'>
        {this.props.pricesDataLoaded
          ? this.renderPricing()
          : <p>Loading</p>
          }
        {this.props.orderDataLoaded && this.props.pricesDataLoaded
          ? this.renderPortfolio()
          : <p>Loading</p>}
      </div>
    )
  }
}

export default Dashboard
