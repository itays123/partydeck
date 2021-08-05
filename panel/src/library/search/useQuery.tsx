import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

type ObjectOfStrings = { [key: string]: string };

export function useQuery() {
  const { search } = useLocation();
  const queryParams = useMemo(() => {
    let result: ObjectOfStrings = {};
    const params = new URLSearchParams(search);
    params.forEach((value, key) => (result[key] = value));
    return result;
  }, [search]);
  return queryParams;
}
