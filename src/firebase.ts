import firebase from 'firebase';
require('firebase/firestore');

const config: Object = {
  apiKey: 'AIzaSyBmJEMJlsCziGMo2JJrcJmExeUVshzd8YE',
  authDomain: 'payshare-96017.firebaseapp.com',
  databaseURL: 'https://payshare-96017.firebaseio.com',
  projectId: 'payshare-96017',
  storageBucket: 'payshare-96017.appspot.com',
  messagingSenderId: '492977831731'
};

firebase.initializeApp(config);
var db = firebase.firestore();

export default db;
