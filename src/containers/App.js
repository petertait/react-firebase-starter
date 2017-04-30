import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { observer, inject } from 'mobx-react'

import Register  from './Register'
import Home  from './Home'

class App extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    this.props.firebaseStore.checkAuth()
  }

  logout() {
    this.props.firebaseStore.logout()
  }

  renderActionButtons() {
    return (
      <div>
        <button onClick={ () => browserHistory.push('/query-users') }>
          Load Users - RandomUser.me Example
        </button>
        <button onClick={ () => browserHistory.push('/query-stuff') }>
          Load Stuff - Firebase Query Example
        </button>
        <button onClick={ () => this.logout() }>
          Logout - Firebase Query Example
        </button>
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.props.firebaseStore.user === null ? (<Register props={this.props}/>) : this.renderActionButtons() }
        <Home />
      </div>
    )
  }
}


export default inject('firebaseStore')(observer(App))
