import React from 'react'
import ReactDOM from 'react-dom'
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
  Redirect
} from 'react-router'
import { Provider } from 'mobx-react'

import App from './containers/App'
import Home from './containers/Home'
import Error from './containers/Error'

import authStore from './stores/authStore'
const stores = { authStore }

ReactDOM.render((
  <Provider {...stores}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='/error' component={Error} />
        <Redirect from='*' to='/error' />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
