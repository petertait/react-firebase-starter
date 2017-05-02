import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Protected from '../../components/Protected'
import Head from '../../components/Head'
import dato, { blog } from '../../stores/DatoStore'

@Protected @inject('store') @observer
export default class Dashboard extends Component {
  constructor() {
		super()

    this.state = {
      page: [],
      articles: []
    }
	}

  componentWillMount() {
    dato.getPage(blog)
      .then((page) => this.setState({page}))
  }

  render () {
    const page = this.state.page
    return (
      <div>
        <Head title='Dashboard' />
        <h1>{page.title}</h1>
      </div>
    )
  }
}
