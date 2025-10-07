import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteQuiz = (mutationFn: () => Promise<void>) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: () => queryClient.invalidateQueries()
    })
};

export default useDeleteQuiz;