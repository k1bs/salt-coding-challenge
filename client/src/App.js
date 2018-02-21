import React, { Component } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      auth: false,
      user: null
    }
  }

  render () {
    return (
      <Router>
        <div className='App'>
          <Header />
          <div className='container'>
            <Route exact path='/' component={Home} />
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
