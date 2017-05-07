import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { firebase } from '../../config/firebase'

import Protected from '../../components/Protected'
import Head from '../../components/Head'

import CreateRequest from '../../components/DataRequests/CreateRequest'
import RequestList from '../../components/DataRequests/RequestList'

@Protected @inject('store') @observer
export default class Dashboard extends Component {
  constructor(props) {
		super(props)

    this.state = {
      requests: [],
      loading: true,
      currentUser: null
    }
	}

  componentWillMount() {
    const userID = this.props.store.authStore.user.uid
    firebase.fetch(`users/${userID}`, {
      context: this
    }).then(currentUser => {
      this.setState({currentUser: currentUser})
    }).catch(error => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.ref = firebase.syncState('dataRequests', {
      context: this,
      asArray: true,
      state: 'requests',
      then() {
        this.setState({loading: false})
      }
    })
  }

  componentWillUnmount() {
    firebase.removeBinding(this.ref)
  }

  render () {
    const { requests, currentUser } = this.state
    return (
      <div>
        <Head title='Dashboard' />
        <h1>Dashboard</h1>
        {this.state.loading === true ?
          <h3>Loading...</h3> :
          <div>
            <RequestList requests={requests} />
            <CreateRequest currentUser={currentUser}/>
          </div>
        }
      </div>
    )
  }
}
