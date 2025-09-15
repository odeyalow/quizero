import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';

function useUpdateData(mutationFn: () => Promise<void>, mutationKey?: QueryKey) {   
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: () => mutationFn(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: mutationKey });
        }
    })
}

export default useUpdateData;