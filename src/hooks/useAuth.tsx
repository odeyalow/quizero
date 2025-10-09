import { useState } from "react";
import { createUserWithEmailAndPassword,
        getAuth,
        signInWithEmailAndPassword,
        signOut,
        updateProfile,
        sendPasswordResetEmail
} from "firebase/auth";

import { provider, signInWithPopup, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import app from "@/lib/firebase";
import useUserInit from "@/hooks/useUserInit";

const useAuth = () => {
    const auth = getAuth(app);
    const [formErrorMessage, setformErrorMessage] = useState<string>('');
    const { mutate, isPending, isError } = useUserInit();
    
    const registerUser = async (email: string, password: string, username: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: username
            })
            mutate();
            setformErrorMessage('');
        } catch (error: any) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    setformErrorMessage('Пользователь с такой почтой уже существует');
                    break;
                case "auth/too-many-requests":
                    throw new Error("Слишком много попыток входа. Попробуйте позже.");
                default:
                    setformErrorMessage('Непредвиденная ошибка, попробуйте еще раз');
            }
        }
    }
    const loginUser = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setformErrorMessage('');
        } catch (error: any) {
            switch (error.code) {
                case "auth/invalid-credential":
                    setformErrorMessage('Неправильный логин или пароль');
                    break;
                case "auth/too-many-requests":
                    throw new Error("Слишком много попыток входа. Попробуйте позже.");
                default:
                    setformErrorMessage('Непредвиденная ошибка, попробуйте еще раз');
            }
        }
    }
    const loginUserWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    createdAt: new Date(),
                });
            }

            return user;
        } catch (error) {
            console.error("Google login error:", error);
            throw error;
        }
    };

    const signOutUser = async () => {
        try {
            await signOut(auth);
        } catch (error) {
           throw new Error('Ошибка: ' + error);
        }
    }

    const resetPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error: any) {
            alert("Ошибка при отправке письма: " + error.message);
        }
    };


    return { formErrorMessage, loginUser, registerUser, loginUserWithGoogle, signOutUser, resetPassword, isPending, isError };
}
 
export default useAuth;