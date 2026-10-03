import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

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


// Create a SEPARATE Firebase app for admin
const adminApp = initializeApp(
    firebaseConfig,
    "RockyDelishAdmin"
);


// Admin authentication
const adminAuth = getAuth(adminApp);


// Keep admin logged in
const adminAuthPersistence = setPersistence(
    adminAuth,
    browserLocalPersistence
);


// Admin Firestore
const adminDb = getFirestore(adminApp);


export {
    adminApp,
    adminAuth,
    adminDb,
    adminAuthPersistence
};