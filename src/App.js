import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { observer, inject } from 'mobx-react'
import DevTools, { configureDevtool } from 'mobx-react-devtools'

import LoginContainer  from './containers/LoginContainer'
import Home  from './containers/Home'

configureDevtool({
  // Turn on logging changes button programmatically:
  logEnabled: true,
  // Turn off displaying conponents' updates button programmatically:
  updatesEnabled: false,
})

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.firebaseStore.doCheckAuth()
  }

  logout() {
    this.props.firebaseStore.doLogout()
  }

  renderActionButtons() {
    return (
      <div>
        <button className='App-button' onClick={ () => browserHistory.push('/query-users') }>
          Load Users - RandomUser.me Example
        </button>
        <button className='App-button' onClick={ () => browserHistory.push('/query-stuff') }>
          Load Stuff - Firebase Query Example
        </button>
        <button className='App-button' onClick={ () => this.logout() }>
          Logout - Firebase Query Example
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className='App-intro'>
        { this.props.firebaseStore.user === null ? (<LoginContainer props={this.props}/>) : this.renderActionButtons() }
        <Home />
        <DevTools graphEnabled={true}/>
      </div>
    )
  }
}


export default inject('firebaseStore')(observer(App))
