import { useQuery, UseQueryResult } from '@tanstack/react-query';

function useGetData<T>(documentName: string, queryFn: () => Promise<T[]> | T[] ): UseQueryResult<T[], Error> {
    return useQuery<T[], Error>({
        queryKey: [documentName],
        queryFn: queryFn,
    })
}

export default useGetData;