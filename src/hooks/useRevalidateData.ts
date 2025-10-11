import { useQueryClient } from "@tanstack/react-query";

function useRevalidateData() {
  const queryClient = useQueryClient();

  const revalidate = (queryKey: string | unknown[]) => {
    queryClient.invalidateQueries({
      queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    });
  };

  return revalidate;
}

export default useRevalidateData;