import { useState } from "react";
import { createUserWithEmailAndPassword,
        getAuth,
        signInWithEmailAndPassword,
        signOut,
        updateProfile } from "firebase/auth";
import app from "@/lib/firebase";

import useDatabase from "./useDatabase";

const useAuth = () => {
    const auth = getAuth(app);
    const { createUserData } = useDatabase();
    const [errorMessage, setErrorMessage] = useState<string>('');

    //TODO: Add loading and error ui handlers
    const registerUser = async (email: string, password: string, username: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: username
            })
            createUserData(userCredential.user.uid);
            setErrorMessage('');
        } catch (error: any) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    setErrorMessage('Пользователь с такой почтой уже существует');
                    break;
                case "auth/too-many-requests":
                    throw new Error("Слишком много попыток входа. Попробуйте позже.");
                default:
                    setErrorMessage('Непредвиденная ошибка, попробуйте еще раз');
            }
        }
    }
    const loginUser = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setErrorMessage('');
        } catch (error: any) {
            switch (error.code) {
                case "auth/invalid-credential":
                    setErrorMessage('Неправильный логин или пароль');
                    break;
                case "auth/too-many-requests":
                    throw new Error("Слишком много попыток входа. Попробуйте позже.");
                default:
                    setErrorMessage('Непредвиденная ошибка, попробуйте еще раз');
            }
        }
    }
    const signOutUser = async () => {
        try {
            await signOut(auth);
        } catch (error) {
           throw new Error('Ошибка: ' + error);
        }
    }

    return { errorMessage, loginUser, registerUser, signOutUser };
}
 
export default useAuth;