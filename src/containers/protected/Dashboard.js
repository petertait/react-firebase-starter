import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Protected from '../../components/Protected'
import Head from '../../components/Head'

@Protected @inject('store') @observer
export default class Dashboard extends Component {
  render () {
    return (
      <div>
        <Head title='Dashboard' />
        <h1>Hi</h1>
      </div>
    )
  }
}
