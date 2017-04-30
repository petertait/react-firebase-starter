import { extendObservable } from 'mobx'
import * as firebase from 'firebase'

// This is the store that is used to access and update the firebase data
export default class FirebaseStore {

  constructor() {
    extendObservable(this, {
      isLoading: false,
      stuffList: [],
      newStuff : null,
      error: null,
      user: null,
    })


    // Initialize firebase...
    const firebaseConfig = {
      apiKey: 'AIzaSyDBzgNY9Pc-2bpG1MbxXOWCLEx8X7KybbI',
      authDomain: 'react-firebase-starter-64d76.firebaseapp.com',
      databaseURL: 'https://react-firebase-starter-64d76.firebaseio.com'
    }

    firebase.initializeApp(firebaseConfig)
  }

  login({email,password}) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.error = null
        this.user = user
      }, (_error) => {
        this.error = _error
        this.user = null
      })
  }

  createUser({email, password}) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return firebase.database().ref(`users/${user.uid}`)
          .set({
            email: user.email,
            uid: user.uid
          })
          .then(() => user)
      })
  }

  checkAuth() {
    const auth = firebase.auth()
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.error = null
        this.user = user
      } else {
        this.error = null
        this.user = null
      }
    })
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.user = null
    })
  }

  // load the objects from the stuff path in the firebase store
  loadStuff() {
    this.isLoading = true

    let result = []
    // load data from firebase...
    firebase.database().ref('stuff').orderByKey().once('value', (_snapshot) => {
      _snapshot.forEach((_childSnapshot) => {
        // get the key/id and the data for display
        let element = _childSnapshot.val()
        element.id = _childSnapshot.key
        result.push(element)
      })

      this.stuffList = result
      this.isLoading = false

    }).catch((_error) => {
      this.error = _error.message
      this.isLoading = false
    })
  }

  // add on object to the firebase store
  addStuff(_options) {
    this.isLoading = true

    const newPostKey = firebase.database().ref().child('stuff').push().key

    const updates = {}
    updates['/stuff/' + newPostKey] = {..._options, when : Date.now() }

    firebase.database().ref().update(updates).then((_response) => {
      this.newStuff = {...updates['/stuff/' + newPostKey], id: newPostKey}
      return this.stuffList.push(this.newStuff)
    }).then(() => {
      this.isLoading = false
    }).catch((_error) => {
      this.error = _error.message
      this.isLoading = false
    })
  }
}
