import firebase from 'firebase'

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDBzgNY9Pc-2bpG1MbxXOWCLEx8X7KybbI",
  authDomain: "react-firebase-starter-64d76.firebaseapp.com",
  databaseURL: "https://react-firebase-starter-64d76.firebaseio.com"
})

export const ref = firebase.database().ref()
export const db = firebase.database()
export const firebaseAuth = firebase.auth
