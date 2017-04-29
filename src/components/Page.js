import React, { Component } from 'react'

import AuthStore from '../store/auth'


export default class Page extends Component {
  componentWillMount() {
    this.authStore = new AuthStore()
    this.stores = {
      store: this.store,
      authStore: this.authStore
    }
  }

  componentWillUnmount() {
    if (this.authStore) {
      this.authStore.cleanup()
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}
