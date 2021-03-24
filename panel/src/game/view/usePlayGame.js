import { useEffect, useRef } from 'react';
import { GameWebsiteLink } from '../../shared/helpers/GameWebsiteLink';
import { useFetch } from '../../shared/helpers/useAsyncFetch';

export function usePlayGame(gameId) {
  const { doFetch, data, isLoading } = useFetch(
    '/play/' + gameId,
    'GET',
    false
  );
  const windowRef = useRef();

  useEffect(() => {
    if (data.code && !isLoading) {
      const url = GameWebsiteLink + '?code=' + data.code;
      windowRef.current.location = url;
    }
  }, [data, isLoading]);

  return {
    play() {
      console.log('playing...');
      windowRef.current = window.open();
      doFetch();
    },
  };
}
