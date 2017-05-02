import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import { injectGlobal } from './config/styles'

ReactDOM.render(
  <injectGlobal>
    <App />
  </injectGlobal>,
  document.getElementById('root')
);
