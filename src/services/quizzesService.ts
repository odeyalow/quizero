import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";

import { QuizDataType } from "@/types/QuizDataType";

const quizzesRef = collection(db, "quizzes");

const quizzesService = {
    getById: async (id: string): Promise<QuizDataType | null> => {
        const docRef = doc(quizzesRef, id);
        const docSnap = await getDoc(docRef);

        if ( docSnap.exists() ) {
            return { id: docSnap.id, ...docSnap.data() as Omit<QuizDataType, 'id'> }
        } else {
            return null;
        }
    },
    getAll: async (): Promise<QuizDataType[]> => {
        const quizzes = query(quizzesRef, where('isPublic', '==', true));
        const querySnapshot = await getDocs(quizzes);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as Omit<QuizDataType, 'id'> }));
    },
    getBySearchQuery: async (searchQuery: string, quizzes: QuizDataType[]): Promise<QuizDataType[]> => {
        if ( !searchQuery ) return [];
        return quizzes.filter((quiz: QuizDataType) => 
            quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    },
    getWithFilters: async (filters: { category?: string, authorConfirmed?: boolean }): Promise<QuizDataType[]> => {
        let quizzes: any = quizzesRef;

        if ( filters.category ) {
            quizzes = query(quizzes, where('category', '==', filters.category))
        }
        if ( filters.authorConfirmed ) {
            quizzes = query(quizzes, where('authorConfirmed', '==', filters.authorConfirmed));
        }

        const snapshot = await getDocs(quizzes);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as Omit<QuizDataType, 'id'> }));
    },
    getByIdArray: async (idArray: string[]): Promise<QuizDataType[]> => {
        if ( idArray.length === 0 ) return [];

        const chunks = [];
        for (let i = 0; i < idArray.length; i += 10) {
            chunks.push(idArray.slice(i, i + 10));
        }

        let results: any[] = [];

        for (const chunk of chunks) {
            const quizzes = query(
                collection(db, "quizzes"),
                where("__name__", "in", chunk)
            );
            const quizzesSnap = await getDocs(quizzes);
            quizzesSnap.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() as Omit<QuizDataType, 'id'> });
            });
        }

        return results;
    }
}

export default quizzesService;