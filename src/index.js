import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { browserHistory, Route, Router, IndexRoute } from 'react-router'

import { stores } from './stores/stores'
import { Provider } from 'mobx-react'

import App from './App'
import Home from './containers/Home'
import QueryUsers from './containers/QueryUsers'
import QueryStuff from './containers/QueryStuff'

/**
 * used as a guard to prevent users from accessing
 * secure routes
 *
 * @param nextState
 * @param replaceState
 */
function checkAuth(nextState, replaceState) {
  let {firebaseStore} = stores
  if (nextState.location.pathname === '/') return
  if (firebaseStore.user === null) {
    replaceState('/')
  }
}

ReactDOM.render(
  <Provider {...stores} >
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route onEnter={checkAuth}>
          <Route path="/query-users" component={QueryUsers}/>
          <Route path="/query-stuff" component={QueryStuff}/>
        </Route>
      </Route>
    </Router>
  </Provider>, document.getElementById('root')
)
