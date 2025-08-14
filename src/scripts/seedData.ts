import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { QuizDataType } from "@/types/QuizDataType";
import CategoryDataType from "@/types/CategoryDataType";

const addData = async (data: any) => {
      for (const item of data) {
          await addDoc(collection(db, `${data}`), item);
      }
      console.log('Data added to firestore');
}

export const seedData = async () => {
  const quizzes: QuizDataType[] = [
  ];

  const categories: CategoryDataType[] = [
  { id: "general", title: "Общее", emoji: "🌍" },
  { id: "movies", title: "Кино", emoji: "🎬" },
  { id: "sport", title: "Спорт", emoji: "🏀" },
  { id: "games", title: "Игры", emoji: "🎮" },
  { id: "food", title: "Еда", emoji: "🍔" },
  { id: "nature", title: "Природа", emoji: "🌿" },
  { id: "music", title: "Музыка", emoji: "🎵" },
  { id: "science", title: "Наука", emoji: "🔬" },
  { id: "history", title: "История", emoji: "📜" },
  { id: "geography", title: "География", emoji: "🗺️" },
  { id: "art", title: "Искусство", emoji: "🎨" },
  { id: "technology", title: "Технологии", emoji: "💻" },
  { id: "books", title: "Книги", emoji: "📚" },
  { id: "memes", title: "Мемы", emoji: "😂" },
  { id: "travel", title: "Путешествия", emoji: "✈️" }
  ];
  
  try {
      addData(categories);
  } catch {
      console.log('There is an error occured while adding data to firestore')
  }
}