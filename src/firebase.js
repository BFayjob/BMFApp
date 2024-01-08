
// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/database';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5aj5FQppJEVTG1d3FEvT24y3p32SsCPM",
  authDomain: "bmfapp-4ca86.firebaseapp.com",
  databaseURL: 'https://bmfapp-4ca86-default-rtdb.firebaseio.com/',
  projectId: "bmfapp-4ca86",
  storageBucket: "bmfapp-4ca86.appspot.com",
  messagingSenderId: "448821912760",
  appId: "1:448821912760:web:79e43e1d5c26e9def9804d",
  measurementId: "G-C0CS4Z5P3M"
};

firebase.initializeApp(firebaseConfig)
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firestore = firebase.firestore();