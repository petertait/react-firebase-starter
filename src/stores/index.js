import firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyDBzgNY9Pc-2bpG1MbxXOWCLEx8X7KybbI",
  authDomain: "react-firebase-starter-64d76.firebaseapp.com",
  databaseURL: "https://react-firebase-starter-64d76.firebaseio.com"
})

export const db = firebase.database()
export const ref = firebase.database().ref()
export const auth = firebase.auth()

export { default as authStore } from './authStore'
