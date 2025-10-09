import UserDataType from '@/types/userDataType';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const useGetUser = (userId?: string): UseQueryResult<UserDataType, Error> => {   
    const fetchUserData = async () => {
        if (!userId) throw new Error('User ID is required');

        const userSnapshot = await getDoc(doc(db, 'users', userId));

        if (userSnapshot.exists()) {
            return userSnapshot.data() as UserDataType;
        } else {
            throw new Error('User data was not found');
        }
    };

    return useQuery<UserDataType, Error>({
        queryKey: ['user', userId],
        queryFn: fetchUserData,
        enabled: !!userId,
    });
}
 
export default useGetUser;