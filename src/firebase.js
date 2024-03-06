// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA1yd7lAFXJh-VZ2il5fDzqfWqGuSyregY",
    authDomain: "workscape-84122.firebaseapp.com",
    projectId: "workscape-84122",
    storageBucket: "workscape-84122.appspot.com",
    messagingSenderId: "734998941399",
    appId: "1:734998941399:web:1a69bc537ee162f64e6a92"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
