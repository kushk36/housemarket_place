// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBam-xdIVZXIy3_nX4zPswOyZ77LV8d6lU",
    authDomain: "house-marketplace-app-38fbd.firebaseapp.com",
    projectId: "house-marketplace-app-38fbd",
    storageBucket: "house-marketplace-app-38fbd.appspot.com",
    messagingSenderId: "916103057941",
    appId: "1:916103057941:web:6f52a7515490c67428b41c"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
export default db

