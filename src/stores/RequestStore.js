import { observable, computed } from 'mobx'
import { db } from '../config/firebase'
import { observableMap, toJS } from 'mobx'

class Ask {
  @observable requests = observableMap({})

  constructor() {
    db.ref('dataRequests').on('value', (snapshot) => {
      this.requests = snapshot.val()
    })
  }

  @computed get json() {
    return toJS(this.requests)
  }

  add = (name) => {
    const id = db.ref('dataRequests').push().key
    this.update(id, name)
  }

  update = (id, name) => {
    db.ref('dataRequests').update({[id]: {name}})
  }

  remove = (id) => {
    db.ref('dataRequests').child(id).remove()
  }
}

const requestStore = new Ask()

export { requestStore }
