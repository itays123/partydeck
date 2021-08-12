import { useMemo, useState, useCallback } from 'react';
import { useFetch } from './useFetch';

export function useGameCheck() {
  const { doFetch, status, isLoading } = useFetch(
    '/check',
    'GET',
    false,
    false
  );
  const gameFound = useMemo(() => status === 200, [status]);
  const [checkAllowed, setCheckAllowed] = useState(true);
  const allowCheck = useCallback(() => setCheckAllowed(true), []);

  return {
    gameFound,
    isLoading,
    allowCheck,
    async checkGame(code: string) {
      setCheckAllowed(false);
      const { status } = await doFetch(null, `?code=${code}`);
      return status === 200;
    },
    validateCode(value: string) {
      if (value.length !== 6) return 'Invalid code';
      else if (checkAllowed) return null;
      else if (!gameFound) return 'Game does not exist';
      else return null;
    },
  };
}
