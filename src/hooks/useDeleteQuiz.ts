import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteQuiz = (mutationKey:string, mutationFn: () => Promise<void>) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries();
            queryClient.invalidateQueries({ queryKey: [mutationKey] });
        }
    })
};

export default useDeleteQuiz;