import { useFetch } from '../shared/helpers/useFetch';

export function useGame(gameId) {
  const { data, isLoading, status } = useFetch('/game/' + gameId);

  return {
    ...data.game,
    isLoading,
    status,
  };
}
