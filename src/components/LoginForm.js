import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { authStore } from '../stores'

@inject('authStore') @observer
export default class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.authStore = authStore()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.authStore().signIn(this.email.value, this.password.value)
  }

  resetPassword = () => {
    this.props.authStore().resetPassword(this.email.value)
  }

  render () {
    return (
      <div>
        {this.props.authStore.loading ? 'loading' : 'ready'}
        {this.props.authStore && this.props.authStore.user ?
          <button onClick={() => this.props.authStore.signOut()}>Logout</button>
          :
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Email</label>
              <input ref={(email) => this.email = email} placeholder='Email'/>
            </div>
            <div>
              <label>Password</label>
              <input type='password' placeholder='Password' ref={(password) => this.password = password} />
            </div>
            <div>
              <span aria-hidden='true'></span>
              <a href='#' onClick={this.resetPassword}>Forgot Password?</a>
            </div>
            <button type='submit'>Login</button>
          </form>
        }
      </div>
    )
  }
}
