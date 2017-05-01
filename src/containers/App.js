import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Switch } from 'react-router-dom'
import { Provider, observer } from 'mobx-react'
import AuthStore from '../stores/AuthStore'

import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './protected/Dashboard'

@observer
export default class App extends Component {
  constructor(props) {
		super(props)

    this.authStore = new AuthStore()
    this.store = {
      authStore: this.authStore
    }
	}

  componentWillUnmount() {
    this.store.authStore.cleanup()
  }

  render() {
    return (
      <BrowserRouter>
        <Provider store={this.store}>
          <div>
            <nav className="navbar navbar-default navbar-static-top">
              <div className="container">
                <div className="navbar-header">
                  <Link to="/" className="navbar-brand">React Router + Firebase Auth</Link>
                </div>
                <ul className="nav navbar-nav pull-right">
                  <li>
                    <Link to="/" className="navbar-brand">Home</Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                  </li>
                  <li>
                    {this.store.authStore.user ?
                      <a href="#" className="navbar-brand" onClick={() => { this.store.authStore.signOut() }}>Logout</a>
                      :
                      <span>
                        <Link to="/login" className="navbar-brand">Login</Link>
                        <Link to="/register" className="navbar-brand">Register</Link>
                      </span>
                    }
                  </li>
                </ul>
              </div>
            </nav>
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path='/' exact component={Home} />
                  <Route path='/login' component={Login} />
                  <Route path='/register' component={Register} />
                  <Route path='/dashboard' component={Dashboard} />
                  <Route render={() => <h3>No Match</h3>} />
                </Switch>
              </div>
            </div>
          </div>
        </Provider>
      </BrowserRouter>
    )
  }
}
