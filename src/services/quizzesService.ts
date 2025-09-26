import { db, storage } from "@/lib/firebase";
import { collection, getDocs, query, where, doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { QuizDataType } from "@/types/QuizDataType";
import QuizImageFilesType from "@/types/QuizImageFilesType";
import NewQuizDataType from "@/types/newQuizDataType";

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
    },
    createQuiz: async (quizData: NewQuizDataType, quizImages: QuizImageFilesType) => {
        const quizRef = doc(collection(db, "quizzes"));
        const quizId = quizRef.id;
        
        const { coverImage, questionImages} = quizImages;


        let coverImageUrl: string | null = null;
        if (coverImage) {
            const ext = coverImage?.name.split('.').pop();
            const coverRef = ref(storage, `quizzes/${quizId}/cover.${ext}`);
            await uploadBytes(coverRef, coverImage);
            coverImageUrl = await getDownloadURL(coverRef);
        }

        const updatedQuestions = await Promise.all(
        quizData.questions.map(async (q) => {
            const file = questionImages[q.id];
            if (!file) return q;

            const ext = file.name.split(".").pop();
            const questionRef = ref(storage, `quizzes/${quizId}/questions/${q.id}.${ext}`);
            await uploadBytes(questionRef, file);
            const downloadURL = await getDownloadURL(questionRef);

            return {
                ...q,
                image: downloadURL,
            };
            })
        );

        const finalQuizData = {
            ...quizData,
            coverImageUrl,
            questions: updatedQuestions,
            createdAt: Date.now(),
        };

        await setDoc(quizRef, finalQuizData);

        return { quizId };
    }
}

export default quizzesService;