import { useEffect, useState } from "react";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { useAuthData } from "@/components/layouts/authProvider";
import { UserDataType } from "@/types/userDataType";

const useDatabase = () => {
  const user = useAuthData();
  const [userData, setUserData] = useState<UserDataType | null>();
  
    useEffect(() => {
        const fetchUserData = async () => {
            if (!user.user?.uid) return;
            const data = await getUserData(user.user.uid)
            setUserData(data as UserDataType);
        };

        fetchUserData();
    }, [user.user?.uid]);

  const createUserData = async (userId: string) => {
    if (!userId) return;
    await setDoc(doc(db, 'users', userId), {
      passedQuizzesAmount: 0,
      createdQuizzesAmount: 0,
      percentOfCorrectAnswers: 0,
      createdQuizzes: [],
      createdAt: serverTimestamp(),
    })
  }
  const getUserData = async (userId: string) => {
    if (!userId) return;
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if ( userSnap.exists() ) {
      return userSnap.data();
    } else {
      throw new Error('User data was not found');
    }
  }

  return { userData, createUserData, getUserData};
}
 
export default useDatabase;