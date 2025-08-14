import { db } from "@/lib/firebase";
import { doc, updateDoc, increment, arrayUnion, runTransaction } from "firebase/firestore";

import UserDataType from "@/types/UserDataType";

const userService = {
    updateOnQuizComplete: async (uid: string, quizId: string, quizCorrectAnswersAmount: number, allQuizAnswersAmount: number) => {
        const userRef = doc(db, "users", uid);
        await runTransaction(db, async (tx) => {
            const snap = await tx.get(userRef);
            if (!snap.exists()) throw new Error("User not found");

            const data = snap.data() as { passedQuizzes?: string[] };

            if (data.passedQuizzes?.includes(quizId)) {
                return;
            }

            tx.update(userRef, {
                passedQuizzes: arrayUnion(quizId),
                correctAnswersAmount: increment(quizCorrectAnswersAmount),
                allAnswersAmount: increment(allQuizAnswersAmount),
            });
        });
    },
    updateOnQuizCreate: async (uid: string, createdQuizId: string) => {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
            createdQuizzesAmount: increment(1),
            createdQuizzes: arrayUnion(createdQuizId)
        })
    },
    updateProfilePicture: (uid: string, imageUrl: string) => {
        const userRef = doc(db, "users", uid);
    }
}

export default userService;