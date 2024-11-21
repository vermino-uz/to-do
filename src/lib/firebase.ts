import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBOxNnlL-CY-fVwBs7G4PZJ5r0fXMvHPvY",
  authDomain: "bolt-todo-app.firebaseapp.com",
  projectId: "bolt-todo-app",
  storageBucket: "bolt-todo-app.appspot.com",
  messagingSenderId: "583829205843",
  appId: "1:583829205843:web:9d14f98f93a5c875f5d1a8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);