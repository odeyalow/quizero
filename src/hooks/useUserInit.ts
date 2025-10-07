import UserDataType from "@/types/UserDataType";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuthData } from "@/components/layouts/authProvider";

function useUserInit() {
    const { user } = useAuthData();
    
    const queryClient = useQueryClient();
    const initialUserData: UserDataType = {
        role: 'user',
        username: user?.displayName ?? '',
        percentOfCorrectAnswers: 0,
        correctAnswersAmount: 0,
        allAnswersAmount: 0,
        createdQuizzes: [],
        passedQuizzes: []
    }
    

    const addUser = async () => {
        if (!user?.uid) throw new Error('User ID is required');
        await setDoc(doc(db, "users", user.uid), {
            createdAt: serverTimestamp(),
            ...initialUserData,
        });
    };

    return useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    })
}

export default useUserInit;