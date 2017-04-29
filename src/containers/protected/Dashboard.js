import React, { Component } from 'react'
import { ref, firebaseAuth } from '../../config/constants'

export default class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      user: []
    }
  }

  componentWillMount () {
    const userID = firebaseAuth().currentUser.uid
    const userEmail = ref.child(`users/${userID}`)
    userEmail.on('value', (snapshot) => {
      const user = snapshot.val()
      this.setState({
        user: user
      })
      console.log(user)
    }, function (errorObject) {
      console.log(errorObject.code)
    })
  }

  render () {

    return (
      <div>
        <h1>Hi, {this.state.user.email}</h1>
      </div>
    )
  }
}
