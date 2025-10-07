import { useState } from "react";
import { createUserWithEmailAndPassword,
        getAuth,
        signInWithEmailAndPassword,
        signOut,
        updateProfile } from "firebase/auth";

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
    const signOutUser = async () => {
        try {
            await signOut(auth);
        } catch (error) {
           throw new Error('Ошибка: ' + error);
        }
    }

    return { formErrorMessage, loginUser, registerUser, signOutUser, isPending, isError };
}
 
export default useAuth;