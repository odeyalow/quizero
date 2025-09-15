import { db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import { useQuery, UseQueryResult } from '@tanstack/react-query';

function useAddImage(quizId: string, imageFile: File) {
    // const storageRef = ref(storage, `quizzes/${quizId}/${imageFile.name}`);
    // await uploadBytes(storageRef, imageFile);
    // const downloadURL = await getDownloadURL(storageRef);
}

export default useAddImage;