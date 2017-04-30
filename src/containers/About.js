import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Protected } from '../components/Protected'

@observer
class About extends Component {
  render () {
    return (
      <div>
        About is protected
      </div>
    )
  }
}

export default Protected(About)
