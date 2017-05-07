import { observable, computed } from 'mobx'
import { ref, auth } from '../config/firebase'



export default class AuthStore {
  @observable user = null
  @observable authIsPending = true

  constructor() {
    this.unwatchAuth = auth.onAuthStateChanged(user => {
      this.user = user
      this.authIsPending = false
      if(user) {}
    })

  }

  watchAuth(onUser, onError) {
    return auth.onAuthStateChanged(onUser, onError)
  }

  user() {
    return this.user
  }

  // currentUser() {
  //   const user = auth.currentUser
  //   const userID = user.uid
  //   firebase.fetch(`users/${user}`, {
  //     context: this
  //   }).then(currentUser => {
  //     return currentUser
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // }

  // This should be called if we have multiple instances of AuthStore.
  // For example, if AuthStore lives inside an App component, call cleanup() in App's componentWillUnmount.
  // If there's only a singleton AuthStore, then it's ok to never call this.
  cleanup() {
    if (this.unwatchAuth) {
      this.unwatchAuth()
    }
  }

  signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        return user
      })
      .catch(error => {
        throw error
      })
  }

  resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email)
  }

  createUser = (email, password, displayName, team) => {
    return auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
          auth.currentUser.sendEmailVerification()
          return ref.child(`users/${user.uid}`)
            .set({
              email: user.email,
              uid: user.uid,
              displayName: displayName,
              team: team
            })
            .then(user => {
              return user
            })
        })
        .catch(error => {
          throw error
        })
  }


  signOut() {
    return auth.signOut()
      .catch(error => {
        throw error
      })
  }

  @computed get isAuthenticated() {
    return !!this.user
  }
}
