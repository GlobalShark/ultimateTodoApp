import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';



//firebase connection


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD5mVBxXal36j2iKpjV9rB7W_E27d2BeG4",
    authDomain: "shahzaib-com-app8.firebaseapp.com",
    databaseURL: "https://shahzaib-com-app8.firebaseio.com",
    projectId: "shahzaib-com-app8",
    storageBucket: "shahzaib-com-app8.appspot.com",
    messagingSenderId: "626581417392"
  };
  firebase.initializeApp(config);
  export const db = firebase.firestore();



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


