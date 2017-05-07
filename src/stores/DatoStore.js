import { SiteClient } from 'datocms-client'
// import { observable, autorun, computed } from 'mobx'

export const DATOCMS_CLIENT = '99cfee362eccae210a4a'

export const home = '49120'
export const about = '49210'
export const blog = '49121'

export default class DatoStore {
  // @observable articles = []

  constructor() {
    this.client = new SiteClient(DATOCMS_CLIENT)

    // let articleList = autorun(() => {
    //   this.client.items.all('8968')
    //     .then((articles) => {
    //       // this.setState({articles})
    //       return this.articles = articles
    //     })
    // })
  }

  getPages = () => (
    this.client.items.all()
  )

  getPage = (id) => (
    this.client.items.find(id)
  )

  getType = (type) => (
    this.client.items.all({ 'filter[type]': type })
  )

  getPath = (path) => (
    this.client.items.all({
      'filter[query]': path
    })
  )

  getField = (page) => (
    this.client.items.all({
      'filter[id]': page
    })
  )

  // getArticles() {
  //   this.client.items.all('article')
  //     .then((articles) => {
  //       // this.setState({articles})
  //       return articles
  //     })
  // }

  // getArticles = () => (
  //   this.client.items.all({ 'filter[type]': 'articles' })
  //     .then((articles) => {
  //       return articles
  //     })
  // )
}
