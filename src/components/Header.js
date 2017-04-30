import React, { Component } from 'react'
import { Link } from 'react-router'
import { observer, inject } from 'mobx-react'

@inject('authStore') @observer
export default class Header extends Component {
  render () {
    return (
      <header className='header'>
        <Link to='/'>Home</Link>
        {this.props.authStore.user ?
          <Link to='/about'>About</Link>
          :
          <Link to='/login'>Login</Link>
        }
      </header>
    )
  }
}
