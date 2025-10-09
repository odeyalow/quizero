import { db, storage } from "@/lib/firebase";
import { doc, updateDoc, increment, arrayUnion, runTransaction, arrayRemove, deleteField } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from "firebase/storage";

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
            createdQuizzes: arrayUnion(createdQuizId)
        })
    },
    updateOnQuizDelete: async(uid: string, quizId: string) => {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
            createdQuizzes: arrayRemove(quizId)
        })
    },
    updateUsername: async(uid: string, newUsername: string) => {
        const newValue = newUsername === '' ? 'quizero-user' : newUsername;
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
            username: newValue,
            displayName: newValue
        })
    },
    updateProfilePicture: async(uid: string, image: File) => {
        try {
            const ext = image.name.split(".").pop();
            const storageRef = ref(storage, `profileImages/${uid}-profileImage.${ext}`);
            await uploadBytes(storageRef, image);

            const pfpURL = await getDownloadURL(storageRef);

            const userRef = doc(db, "users", uid);
            await updateDoc(userRef, {
                photoURL: pfpURL,
            });
        } catch (error) {
            console.error("Ошибка при обновлении фото профиля:", error);
            throw error;
        }
    },
    removeProfilePicture: async(uid: string, imageUrl: string) => {
        try {
            const storage = getStorage();
            const fileRef = ref(storage, imageUrl);
            await deleteObject(fileRef);

            const userRef = doc(db, "users", uid);
            await updateDoc(userRef, { photoURL: deleteField() })
        } catch (error) {
            console.error("Ошибка при удалении фото профиля:", error);
            throw error;
        }
    }
}

export default userService;