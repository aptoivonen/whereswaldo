import { useQuery } from '@tanstack/react-query';

function useTypedQuery<T>(queryKey: string[], queryFn: () => Promise<T>) {
  type TError = Error;
  const { data, error } = useQuery<T, TError, T>({
    queryKey,
    queryFn,
  });
  return { data, error };
}

export default useTypedQuery;
