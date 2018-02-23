import React, { Component } from 'react'

class Dashboard extends Component {
  componentDidMount () {
    this.props.getOrders()
    this.props.getPrices()
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
    let values = [
      (this.props.balances.BTC * this.props.pricesInUSD.BTC),
      (this.props.balances.LTC * this.props.pricesInUSD.LTC),
      (this.props.balances.DOGE * this.props.pricesInUSD.DOGE),
      (this.props.balances.XMR * this.props.pricesInUSD.XMR)
    ]
    let total = (values.reduce((accum, e) => {
      accum += e
      return accum
    })).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    return (
      <div>
        <h5>Total in USD - ${total}</h5>
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
