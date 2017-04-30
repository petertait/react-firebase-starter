import { observable, computed } from 'mobx'
import { auth, ref } from '../stores'

let store = null

class Store {
  @observable user = null
  @observable authIsPending = true

  constructor () {
    this.unwatchAuth = auth.onAuthStateChanged(user => {
      this.user = user
      this.authIsPending = false
      // if(user) {
      //   Router.push('/')
      // }
    })
  }

  cleanup () {
    if (this.unwatchAuth) {
      this.unwatchAuth()
    }
  }

  register = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
          return ref.child(`users/${user.uid}`)
            .set({
              email: user.email,
              uid: user.uid
            })
            .then(() => user)
        }
      )
  }

  signIn = (email, password) => {
    auth.signInWithEmailAndPassword(email, password)
  }

  resetPassword = (email) => {
    auth.sendPasswordResetEmail(email)
  }

  signOut = () => {
    auth.signOut().then(function () {
    }, function (error) {
      console.log(error)
    })
  }

  @computed get isAuthenticated() {
    return !!this.user
  }
}

export default function getStore () {
  if (store === null) {
    store = new Store()
  }
  return store
}
