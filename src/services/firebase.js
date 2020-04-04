import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyApYyDv2sEM3bmpARQxDjKRsxBcLyuu_2c',
  authDomain: 'ku-ms-demo.web.app',
  databaseURL: 'https://ku-ms-demo.firebaseio.com',
  projectId: 'ku-ms-demo',
  storageBucket: 'ku-ms-demo.appspot.com',
  messagingSenderId: '537461078042',
  appId: '1:537461078042:web:1d0f8f1dc13f9ba65939a3'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
