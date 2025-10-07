import { useState, useEffect } from "react";

function useInfiniteScroll<T>(
  queryFn: (last?: any) => Promise<{ data: T[]; last?: any }>,
  limit = 9
) {
  const [data, setData] = useState<T[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMore = async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);

    const result = await queryFn(lastVisible);

    if (result.data.length === 0) {
      setHasMore(false);
    } else {
      setData((prev) => [...prev, ...result.data]);
      setLastVisible(result.last);
    }

    setIsFetching(false);
  };

  useEffect(() => {
    fetchMore();
  }, []);

  return { data, fetchMore, hasMore, isFetching };
};

export default useInfiniteScroll;