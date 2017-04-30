import React, { Component } from 'react'
import { autorun } from 'mobx'
import { observer } from 'mobx-react'
import { browserHistory } from 'react-router'
import { authStore } from '../stores'
import Loading from './Loading'

export default function Protected(Page) {
  return observer(class Protected extends Component {
    componentDidMount() {
      this.disposer = autorun(() => {
        if (typeof window !== 'undefined'
          && !getauthStore().authIsPending
          && !getauthStore().isAuthenticated
        ) {
          browserHistory.push('/login')
        }
      })
    }

    componentWillUnmount(){
      this.disposer()
    }

    render() {
      return (
        <div>
          {
            getauthStore().authIsPending || !getauthStore().isAuthenticated ?
              <Loading /> :
              <Page />
          }
        </div>
      )
    }
  })
}
