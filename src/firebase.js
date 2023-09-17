import firebase from "firebase";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDdf56Z1NiqvXlTmmO9ShApX8j7ihK2n-s",
  authDomain: "twitterclone-dfeb5.firebaseapp.com",
  projectId: "twitterclone-dfeb5",
  storageBucket: "twitterclone-dfeb5.appspot.com",
  messagingSenderId: "223987021906",
  appId: "1:223987021906:web:ebd6ce0a7d136929da478b",
  measurementId: "G-P50PS5VE9D"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
