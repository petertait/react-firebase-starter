import React, { Component } from 'react'
import Head from '../components/Head'

export default class Home extends Component {
  render () {
    return (
      <div>
        <Head title='Welcome' />
        Home. Is not Protected. Anyone can see this.
      </div>
    )
  }
}
