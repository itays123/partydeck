import { useEffect } from 'react';
import { GameWebsiteLink } from '../../shared/helpers/GameWebsiteLink';
import { useFetch } from '../../shared/helpers/useAsyncFetch';

export function usePlayGame(gameId) {
  const { doFetch, data, isLoading } = useFetch(
    '/play/' + gameId,
    'GET',
    false
  );

  useEffect(() => {
    if (data.code && !isLoading) {
      window.open(GameWebsiteLink + '?code=' + data.code);
    }
  }, [data, isLoading]);

  return {
    play() {
      console.log('playing...');
      doFetch();
    },
  };
}
