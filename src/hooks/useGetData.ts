import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

function useGetData<T>(documentName: string, queryFn: () => T[] ): UseQueryResult<T[], Error> {
    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, documentName));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
    }

    return useQuery<T[], Error>({
        queryKey: [documentName],
        queryFn: queryFn,
    })
}

export default useGetData;