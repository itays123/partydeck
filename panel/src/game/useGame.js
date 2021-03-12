import { useFetch } from '../shared/helpers/useAsyncFetch';

export function useGame(gameId) {
  const { data, isLoading, status } = useFetch('/game/' + gameId);

  return {
    ...data.game,
    isLoading,
    status,
  };
}
