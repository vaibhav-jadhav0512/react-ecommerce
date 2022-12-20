import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxZnr_pavQKdYzfXgFgOt_PY-PKP9q8Cw",
  authDomain: "ecommerce-a2a0a.firebaseapp.com",
  projectId: "ecommerce-a2a0a",
  storageBucket: "ecommerce-a2a0a.appspot.com",
  messagingSenderId: "121185298046",
  appId: "1:121185298046:web:03233f766e7cd6d1dbda2f",
  measurementId: "G-GM2N2YHDN3",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
