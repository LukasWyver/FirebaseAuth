import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

let firebaseConfig = {
  apiKey: "AIzaSyB92yhi-qDWKn5lKoz4V1uRawellyGBhEI",
  authDomain: "meuapp-dd949.firebaseapp.com",
  databaseURL: "https://meuapp-dd949-default-rtdb.firebaseio.com",
  projectId: "meuapp-dd949",
  storageBucket: "meuapp-dd949.appspot.com",
  messagingSenderId: "886275837046",
  appId: "1:886275837046:web:fac172e1af89718665a357",
  measurementId: "G-XKXY9QYJN4",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
