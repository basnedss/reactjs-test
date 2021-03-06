// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC7FjJMoi34n8mtVmV9Pr9K9vUgTIuab2c",
    authDomain: "hello-world-bb994.firebaseapp.com",
    projectId: "hello-world-bb994",
    storageBucket: "hello-world-bb994.appspot.com",
    messagingSenderId: "1028818433796",
    appId: "1:1028818433796:web:2698e3d282c23c0c5c8251"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);


export {
    firebaseApp
}
