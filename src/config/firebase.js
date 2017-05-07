import Rebase from 're-base'

export const firebase = Rebase.createClass({
  apiKey: "AIzaSyDBzgNY9Pc-2bpG1MbxXOWCLEx8X7KybbI",
  authDomain: "react-firebase-starter-64d76.firebaseapp.com",
  databaseURL: "https://react-firebase-starter-64d76.firebaseio.com"
})

export const ref = firebase.database().ref()
export const db = firebase.database()
export const auth = firebase.auth()
