import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Router, IndexRoute, browserHistory, Redirect } from 'react-router'
import { Provider } from 'mobx-react'
import { authStore } from './stores'

import App from './containers/App'
import Login from './containers/Login'
import Register from './containers/Register'
import Home from './containers/Home'

const stores = { authStore }

// function checkAuth(nextState, replaceState) {
//   if (nextState.location.pathname === '/') return
//   if (stores.user === null) {
//     replaceState('/')
//   }
// }

ReactDOM.render(
  <Provider {...stores} >
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/error' component={Home} />
        <Redirect from='*' to='/error' />
      </Route>
    </Router>
  </Provider>, document.getElementById('root')
)
