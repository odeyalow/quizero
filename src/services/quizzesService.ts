import { db, storage } from "@/lib/firebase";
import { collection, getDocs, query, where, doc, getDoc, setDoc, deleteDoc, limit, DocumentSnapshot, startAfter } from "firebase/firestore";
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
            return { id: docSnap.id, ...docSnap.data() as Omit<QuizDataType, 'id'> };
        } else return null;
    },
    getByIds: async (ids: string[]): Promise<QuizDataType[]> => {
        const docs = await Promise.all(
            ids.map(async (id) => {
                const docRef = doc(quizzesRef, id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data() as Omit<QuizDataType, 'id'>;
                    if (data.isPublic === true) {
                    return { id: docSnap.id, ...data };
                    }
                }

                return null;
            })
        );

        return docs.filter((doc): doc is QuizDataType => doc !== null);
    },
    getByIdsWithPrivates: async (ids: string[]): Promise<QuizDataType[]> => {
        const docs = await Promise.all(ids.map(id => getDoc(doc(quizzesRef, id))));

        return docs
        .filter(docSnap => docSnap.exists())
        .map(docSnap => ({
            id: docSnap.id,
            ...docSnap.data() as Omit<QuizDataType, 'id'>
        }))
    },
    getAll: async (): Promise<QuizDataType[]> => {
        const quizzes = query(quizzesRef, where('isPublic', '==', true));
        const querySnapshot = await getDocs(quizzes);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as Omit<QuizDataType, 'id'> }));
    },
    getWithPagination: async (limitNumber = 9, lastVisible?: DocumentSnapshot) => {
        let q = query(
            collection(db, "quizzes"),
            where("isPublic", "==", true),
            limit(limitNumber)
        );

        if (lastVisible) {
            q = query(
                collection(db, "quizzes"),
                where("isPublic", "==", true),
                startAfter(lastVisible),
                limit(limitNumber)
            );
        }

        const querySnapshot = await getDocs(q);
        const data: QuizDataType[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<QuizDataType, "id">),
        }));
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] ?? null;

        return { data, last: lastDoc };
    },
    getBySearchQuery: async (searchQuery: string, quizzes: QuizDataType[]): Promise<QuizDataType[]> => {
        if ( !searchQuery ) return [];
        return quizzes.filter((quiz: QuizDataType) => 
            quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    },
    getWithFilters: async (filters: { category?: string }): Promise<QuizDataType[]> => {
        let quizzes: any = quizzesRef;

        if ( filters.category ) {
            quizzes = query(quizzes, where('category', '==', filters.category), where('isPublic', '==', true))
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

        return { quizId, quizData };
    },
    deleteQuiz: async (id: string) => {
        const docRef = doc(quizzesRef, id);
        await deleteDoc(docRef);
    },
}

export default quizzesService;