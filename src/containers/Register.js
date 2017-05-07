import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import Head from '../components/Head'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

@inject('store') @observer
export default class Register extends Component {
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.store.authStore.createUser(
      this.email.value,
      this.password.value,
      this.displayName.value,
      this.team.value)
      .catch(e => this.setState(setErrorMsg(e)))
  }

  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <Head title='Register' />
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input className="form-control" placeholder="Name" ref={(displayName) => this.displayName = displayName} />
          </div>
          <div className="form-group">
            <label>Team</label>
            <select className="form-control" ref={(team) => this.team = team}>
              <option>Global</option>
              <option>Human Resources</option>
              <option>Support</option>
            </select>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(password) => this.password = password} />
          </div>
          {
            this.state.registerError &&
            <div className="alert alert-danger" role="alert">
              <p>{this.state.registerError}</p>
            </div>
          }
          <button type="submit" className="btn btn-primary">Register</button>
          {(this.props.store.authStore.user) && <Redirect to='/dashboard' />}
        </form>
      </div>
    )
  }
}
