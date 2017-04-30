import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Switch } from 'react-router-dom'
import { logout } from '../api/auth'
import { firebaseAuth } from '../config/constants'

import PublicRoute from '../components/PublicRoute'
import PrivateRoute from '../components/PrivateRoute'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './protected/Dashboard'

export default class App extends Component {
  componentDidMount () {

  }

  componentWillUnmount () {

  }

  render() {

    )
  }
}
