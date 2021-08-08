import { useFetch } from '../shared/helpers/useFetch';
import { Game } from './types';

export function useGame(gameId: string) {
  const { data, isLoading, status } = useFetch<any, { game: Game }>(
    '/game/' + gameId
  );

  return {
    ...data.game,
    isLoading,
    status,
  };
}
