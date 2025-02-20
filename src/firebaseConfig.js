// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyADfSh0A-8NevvZ6_ZDR_pL4fAa479-76Q',
  authDomain: 'recipebox-b3277.firebaseapp.com',
  projectId: 'recipebox-b3277',
  storageBucket: 'recipebox-b3277.firebasestorage.app',
  messagingSenderId: '237709484817',
  appId: '1:237709484817:web:08dd799e8d33bdd04962b0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
