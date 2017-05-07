import React, { Component } from 'react'

export default class RequestList extends Component {
  render() {
    const requests = this.props.requests.map((request, index) => {
      return <li key={index}>{request.message}</li>
    })

    return (
      <ul>
        {requests}
      </ul>
    )
  }
}
