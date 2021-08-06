import { useCallback, useEffect, useState } from 'react';

const fetchPath = (path: string) => {
  return process.env.REACT_APP_SERVER_URL + path;
};

export function useFetch<Body = any, Result = any>(
  path: string,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' = 'GET',
  fetchOnMount: boolean = true,
  expectsJson: boolean = true
) {
  const [isLoading, setLoading] = useState(fetchOnMount);
  const [data, setData] = useState<Result>({} as Result);
  const [status, setStatus] = useState(0);

  const doFetch = useCallback(
    async (body?: Body, query: string = '') => {
      let reqInit: RequestInit = { method };
      if (body) {
        reqInit.body = JSON.stringify(body);
        reqInit.headers = { 'Content-Type': 'application/json' };
      }
      setLoading(true);
      const response = await fetch(fetchPath(path) + query, reqInit);
      if (expectsJson) setData((await response.json()) as Result);
      setLoading(false);
      setStatus(response.status);
      return response;
    },
    [method, path, expectsJson]
  );

  useEffect(() => {
    fetchOnMount && doFetch();
  }, [doFetch, fetchOnMount]);

  return { isLoading, data, status, doFetch };
}
