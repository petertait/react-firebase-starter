import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDBzgNY9Pc-2bpG1MbxXOWCLEx8X7KybbI",
  authDomain: "react-firebase-starter-64d76.firebaseapp.com",
  databaseURL: "https://react-firebase-starter-64d76.firebaseio.com",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth