import React, { Component } from 'react'

export default class Home extends Component {
  render () {
    return (
      <div>
        <h1>Home. Is not Protected. Anyone can see this.</h1>
        {this.props.children}
      </div>
    )
  }
}
