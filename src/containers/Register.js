import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

function register({firebaseStore}) {
  return (
    <div>
      <div>
        <Register submitAction={ (data) => firebaseStore.createUser(data) }/>
      </div>
      {firebaseStore.error ? (<div>{firebaseStore.error.message}</div>) : '' }
    </div>
  )
}

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    let params = this.state
    if (params.email.length && params.password.length) {
      this.props.submitAction(params)
    }
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email</label>
            <input ref={(email) => this.email = email} placeholder='Email'/>
          </div>
          <div>
            <label>Password</label>
            <input type='password' placeholder='Password' ref={(password) => this.password = password} />
          </div>
          {
            this.state.registerError &&
            <div>Error:{this.state.registerError}</div>
          }
          <button type='submit' className='btn btn-primary'>Register</button>
        </form>
      </div>
    )
  }
}

export default inject('firebaseStore')(observer(Register))
