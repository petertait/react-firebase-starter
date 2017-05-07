import React, { Component } from 'react'
import { firebase } from '../../config/firebase'

export default class CreateRequest extends Component {
  // handleSubmit() {
  //   var newRequest = ReactDOM.findDOMNode(this.refs.request).value;
  //   ReactDOM.findDOMNode(this.refs.request).value = '';
  //   this.props.createRequest(newRequest)
  // }

  handleSubmit = (e) => {
    e.preventDefault()
    firebase.push('dataRequests', {
      data: {
        message: this.text.value,
        author: this.props.currentUser.displayName,
        timestamp: new Date().toLocaleString('en-US').split(', ')
      },
      context: this,
      then: () => {
        console.log('POSTED')
      }
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" className="form-control" ref={(text) => this.text = text} placeholder="Add New Request" />
        <button className="btn btn-default" type="submit"> Submit </button>
      </form>
    )
  }
}
