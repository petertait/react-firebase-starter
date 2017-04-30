import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import App from './containers/App'
import { stores } from './state/stores'
import './index.css'

function checkAuth(nextState, replaceState) {
  let { firebaseStore } = stores
  if (nextState.location.pathname === '/') return
  if (firebaseStore.user === null) {
    replaceState('/')
  }
}

ReactDOM.render(
  // stores loaded up from state/stores.js
  <Provider {...stores} >
      <Router history={browserHistory}>
          <Route path="/" component={Root}>
              <IndexRoute component={App}/>
              <Route onEnter={checkAuth}>
                  <Route path="/query-users" component={QueryUsers}/>
                  <Route path="/query-stuff" component={QueryStuff}/>
              </Route>
          </Route>
      </Router>
  </Provider>, document.getElementById('root')
)
