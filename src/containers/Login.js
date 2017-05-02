import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import Head from '../components/Head'

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

@inject('store') @observer
export default class Login extends Component {
  state = { loginMessage: null }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.store.authStore.signIn(this.email.value, this.password.value)
      .catch((error) => {
        this.setState(setErrorMsg('Invalid username/password.'))
      })
  }

  resetPassword = () => {
    this.props.store.authStore.resetPassword(this.email.value)
      .catch((error) => {
        this.setState(setErrorMsg(`Email address not found.`))
      })
  }

  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <Head title='Login' />
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(password) => this.password = password} />
          </div>
          {this.state.loginMessage &&
            <div>
              <div className="alert alert-danger" role="alert">
                <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
                <p>{this.state.loginMessage}</p>
              </div>
            </div>
          }
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        {(this.props.store.authStore.user) && <Redirect to='/dashboard' />}
      </div>
    )
  }
}
