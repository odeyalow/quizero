import { initializeApp } from "firebase/app";

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

export default app