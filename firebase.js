// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getAuth,
    setPersistence,
    browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBD-glXS6Z_xT-K8keF6cyuPcIPGIfQBVM",
    authDomain: "rockydelish.firebaseapp.com",
    projectId: "rockydelish",
    storageBucket: "rockydelish.firebasestorage.app",
    messagingSenderId: "39729425295",
    appId: "1:39729425295:web:76f637f53744af944479fa"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Authentication
const auth = getAuth(app);


// Keep the user logged in after refreshing the page
const authPersistence = setPersistence(
    auth,
    browserLocalPersistence
);


// Initialize Firestore
const db = getFirestore(app);


export {
    app,
    auth,
    db,
    authPersistence
};