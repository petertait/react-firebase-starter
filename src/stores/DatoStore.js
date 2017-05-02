import { SiteClient } from 'datocms-client'

export const DATOCMS_CLIENT = '99cfee362eccae210a4a'

export const home = '49120'
export const about = '49210'
export const blog = '49121'

class dato {
  constructor() {
    this.client = new SiteClient(DATOCMS_CLIENT)
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
}

export default new dato()
