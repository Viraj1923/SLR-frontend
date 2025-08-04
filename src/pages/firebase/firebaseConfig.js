import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDflLjbxCiP5kpOr5eorfBU3a8SrdItPlc",
  authDomain: "fingertalkauth.firebaseapp.com",
  projectId: "fingertalkauth",
  storageBucket: "fingertalkauth.firebasestorage.com",
  messagingSenderId: "1034270713819",
  appId: "1:1034270713819:web:6508ed5cad019437fae9fe"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export  { auth, provider };