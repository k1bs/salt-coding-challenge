import React, { Component } from 'react'

class Dashboard extends Component {
  constructor () {
    super()
    this.renderOrderData = this.renderOrderData.bind(this)
  }

  componentDidMount () {
    this.props.getOrders()
  }

  renderOrderData () {
    return (
      <div>
        <h4>BTC: {this.props.balances.BTC}</h4>
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.props.orderDataLoaded
          ? this.renderOrderData()
          : <p>Loading</p>}
      </div>
    )
  }
}

export default Dashboard
