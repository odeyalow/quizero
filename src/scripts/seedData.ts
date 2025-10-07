import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { QuizDataType } from "@/types/QuizDataType";
import CategoryDataType from "@/types/CategoryDataType";

const addData = async (collectionName: string, data: any ) => {
      for (const item of data) {
          await addDoc(collection(db, `${collectionName}`), item);
      }
      console.log('Data added to firestore');
}

export const seedData = async () => {
    // const quizzes = [];

    const categories: CategoryDataType[] = [];
  
    try {
        addData('quizzes', []);
    } catch {
        console.log('There is an error occured while adding data to firestore')
    }
}