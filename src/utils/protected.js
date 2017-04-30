import React, { Component } from 'react'
import { autorun } from 'mobx'
import { observer } from 'mobx-react'
import Router from 'next/router'
import { getAuthStore } from '~/stores'
import { LoadingPage } from '~/components/generic'

export default function protectedPage(Page) {
  return observer(class ProtectedPage extends Component {
    componentDidMount() {
      this.disposer = autorun(() => {
        if (typeof window !== 'undefined'
          && !getAuthStore().authIsPending
          && !getAuthStore().isAuthenticated
        ) {
          Router.push('/login')
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
            getAuthStore().authIsPending || !getAuthStore().isAuthenticated ?
              <LoadingPage /> :
              <Page />
          }
        </div>
      )
    }
  })
}
