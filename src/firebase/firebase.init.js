// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp3pPHtpaJvGDb2g8IEOKhzxLWe1Xr9Eo",
  authDomain: "double-arbor-441302-g6.firebaseapp.com",
  projectId: "double-arbor-441302-g6",
  storageBucket: "double-arbor-441302-g6.firebasestorage.app",
  messagingSenderId: "798157265666",
  appId: "1:798157265666:web:c0ef762e1892563efe401b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;