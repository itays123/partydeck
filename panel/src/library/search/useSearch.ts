import { useEffect, useState } from 'react';
import { Game } from '../../components/GameList/types';
import { useFetch } from '../../shared/helpers/useFetch';

export function useSearch(query: string) {
  const [result, setResult] = useState<Game[]>([]);
  const { isLoading, doFetch, data } = useFetch<any, { result: Game[] }>(
    '/search?q=' + query
  );

  useEffect(() => {
    if (data.result) {
      setResult(arr => [...arr, ...data.result]);
    }
  }, [data]);

  return {
    result,
    isLoading,
    isMore: data.result?.length !== 0,
    loadMore() {
      doFetch(undefined, '&offset=' + result.length);
    },
  };
}
