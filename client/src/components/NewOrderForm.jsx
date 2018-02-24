import React, { Component } from 'react'

class NewOrderForm extends Component {
  constructor () {
    super()
    this.state = {
      from_curr: 'BTC',
      from_amt: '',
      to_curr: 'LTC',
      to_amt: '',
      isOrderValid: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.orderValidityChecker = this.orderValidityChecker.bind(this)
  }

  handleInputChange (e) {
    const name = e.target.name
    const value = e.target.value
    let newFromAmt = (this.props.pricesInUSD[this.state.to_curr] * value) / this.props.pricesInUSD[this.state.from_curr]
    if (this.state.from_curr === 'USD') {
      newFromAmt = (this.props.pricesInUSD[this.state.to_curr] * value)
    }
    this.setState({
      [name]: value,
      from_amt: newFromAmt
    }, () => this.orderValidityChecker())
  }

  orderValidityChecker () {
    if ((this.state.from_amt <= this.props.balances[this.state.from_curr]) &&
      this.state.to_amt > 0 &&
      (this.state.to_curr === 'BTC' || this.state.from_curr === 'BTC')) {
      this.setState({
        isOrderValid: true
      })
    } else {
      this.setState({
        isOrderValid: false
      })
    }
  }

  render () {
    return (
      <div className='auth-form' >
        <form onSubmit={(e) => this.props.handleNewOrderSubmit(e, this.state)} >
          <div className='form-group form-row'>
            <div className='col'>
              <label htmlFor='fromCurr'>Coin to Purchase</label>
              <select id='fromCurr' className='form-control' value={this.state.to_curr} name='to_curr' onChange={this.handleInputChange}>
                <option value='BTC'>BTC</option>
                <option value='LTC'>LTC</option>
                <option value='DOGE'>DOGE</option>
                <option value='XMR'>XMR</option>
              </select>
            </div>
            <div className='col'>
              <label htmlFor='fromAmt'>Quantity to Buy</label>
              <input id='fromAmt' className='form-control' type='number' value={this.state.to_amt} name='to_amt' onChange={this.handleInputChange} />
            </div>
          </div>
          <div className='form-group form-row'>
            <div className='col'>
              <label htmlFor='toCurr'>Funds to Use</label>
              <select id='toCurr' className='form-control' value={this.state.from_curr} name='from_curr' onChange={this.handleInputChange}>
                <option value='BTC'>BTC</option>
                <option value='LTC'>LTC</option>
                <option value='DOGE'>DOGE</option>
                <option value='XMR'>XMR</option>
                <option value='USD'>USD</option>
              </select>
              <label htmlFor='toCurr' className='form-check-label'>Current Balance: {this.props.balances[this.state.from_curr]}</label>
              <label htmlFor='toCurr' className='form-check-label'>ALL TRANSACTIONS MUST INVOLVE BTC</label>
            </div>
            <div className='col'>
              <label htmlFor='toAmt'>Cost to Purchase</label>
              <input id='toAmt' className={'form-control ' + (this.state.isOrderValid !== false ? 'is-valid' : 'is-invalid')} type='number' value={this.state.from_amt} name='from_amt' readOnly />
              <label htmlFor='toAmt' className='form-check-label invalid-feedback'>{!this.state.isOrderValid ? 'Invalid Order' : ''}</label>
            </div>
          </div>
          <div className='form-group form-row'>
            <div className='col'>
              <input className='btn btn-primary' type='submit' value='Submit Order' disabled={!this.state.isOrderValid} />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default NewOrderForm
