import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnhNX6O2boB9wrSm5RfdBnevGj2gAObbY",
  authDomain: "quizero-pp.firebaseapp.com",
  projectId: "quizero-pp",
  storageBucket: "quizero-pp.firebasestorage.app",
  messagingSenderId: "793468637624",
  appId: "1:793468637624:web:7428cb0a621a37170fbf4d",
  measurementId: "G-6W7MYT5RYG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
export default app