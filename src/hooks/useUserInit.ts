import UserDataType from "@/types/userDataType";

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
        passedQuizzesAmount: 0,
        createdQuizzesAmount: 0,
        percentOfCorrectAnswers: 0,
        createdQuizzes: [],
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