import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

function Login({firebaseStore}) {
  return (
    <div>
      <div>
        <FirebaseLoginForm submitAction={ (data) => firebaseStore.login(data) }/>
      </div>
      {firebaseStore.error ? (<div>{firebaseStore.error.message}</div>) : '' }
    </div>
  )
}

class FirebaseLoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    let params = this.state
    if (params.email.length && params.password.length) {
      this.props.submitAction(params)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email: </label>
            <input
              type='text' value={this.state.email}
              onChange={(_event) => this.setState({email: _event.target.value})}/>
          </div>
          <div>
            <label>Password: </label>
            <input
              type='password' value={this.state.password}
              onChange={(_event) => this.setState({password: _event.target.value})}/>
          </div>
          <div>
            <input type='submit' value='Login'/>
          </div>
        </form>
      </div>
    )
  }
}

export default inject('firebaseStore')(observer(Login))
