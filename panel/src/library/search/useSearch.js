import { useEffect, useState } from 'react';
import { useFetch } from '../../shared/helpers/useAsyncFetch';

export function useSearch(query) {
  const [result, setResult] = useState([]);
  const { isLoading, doFetch, data } = useFetch('/search?q=' + query);

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
