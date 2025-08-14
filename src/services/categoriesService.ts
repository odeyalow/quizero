import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";

import CategoryDataType from "@/types/CategoryDataType";

const categoriesRef = collection(db, "categories");

const categoriesService = {
    getById: async (customId: string): Promise<CategoryDataType | null> => {
        const category = query(categoriesRef, where('id', '==', customId))
        const categorySnap = await getDocs(category);

        if ( !categorySnap.empty ) {
            return categorySnap.docs[0].data() as CategoryDataType;
        }
        return null;
    },
    getAll: async (): Promise<CategoryDataType[]> => {
        const querySnapshot = await getDocs(categoriesRef);
        return querySnapshot.docs.map(doc => doc.data() as CategoryDataType);
    },
}

export default categoriesService;