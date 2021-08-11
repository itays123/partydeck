import { useFetch } from '../helpers/useFetch';
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
