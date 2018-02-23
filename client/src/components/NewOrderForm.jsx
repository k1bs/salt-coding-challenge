import React, { Component } from 'react'

class NewOrderForm extends Component {
  constructor () {
    super()
    this.state = {
      from_curr: 'BTC',
      from_amt: '',
      to_curr: 'LTC',
      to_amt: ''
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
        <form>
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
              <label htmlFor='fromAmt'>Quantity</label>
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
              </select>
            </div>
            <div className='col'>
              <label htmlFor='toAmt'>Quantity</label>
              <input id='toAmt' className='form-control' type='number' value={this.state.from_amt} name='from_amt' readOnly />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default NewOrderForm
