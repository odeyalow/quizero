import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

function useGetData<T>(
    documentName: string,
    queryFn: () => Promise<T[]> | T[],
    options?: Omit<UseQueryOptions<T[], Error>, "queryKey" | "queryFn">,
    deps: any[] = [],): UseQueryResult<T[], Error>
    {
    return useQuery<T[], Error>({
        queryKey: deps ? [documentName, ...deps] : [documentName],
        queryFn: queryFn,
        ...options
    })
}

export default useGetData;