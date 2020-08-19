
import * as firebase from 'firebase';
import 'firebase/firestore';

let config = {
    apiKey: "AIzaSyBx_QrHhs5nhxH3Za4aPDXjk4ye6Uee7HY",
    authDomain: "email-authentication-8b307.firebaseapp.com",
    databaseURL: "https://email-authentication-8b307.firebaseio.com",
    projectId: "email-authentication-8b307",
    storageBucket: "email-authentication-8b307.appspot.com",
    messagingSenderId: "547910961680",
    appId: "1:547910961680:web:9a22fac453ccf6db3c1895",
    measurementId: "G-MWWR98VS5T"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  firebase.analytics();

  export default firebase