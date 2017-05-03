import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import Protected from '../../components/Protected'
import Head from '../../components/Head'
import DatoStore, { blog } from '../../stores/DatoStore'

@Protected @inject('store') @observer
export default class Dashboard extends Component {
  constructor() {
		super()

    this.datoStore = new DatoStore()

    this.state = {
      page: [],
      articles: []
    }
	}

  componentWillMount() {
    this.datoStore.getPage(blog)
      .then((page) => this.setState({page}))

    this.datoStore.getType('article')
      .then((articles) => {
        this.setState({articles})
      })
  }

  render () {
    const { articles, page } = this.state
    const articlesList = articles.map(({id, slug, title}) =>
      <li key={id}>
        <Link to={{pathname:`/${page.slug}/${slug}`, state:{id}}}>{title}</Link>
      </li>
    )

    return (
      <div>
        <Head title='Dashboard' />
        <h1>{page.title}</h1>
        {articlesList}
      </div>
    )
  }
}
