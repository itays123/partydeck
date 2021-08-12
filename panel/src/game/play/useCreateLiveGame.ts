import { useFetch } from '../../helpers/useFetch';

export function useCreateLiveGame(gameId: string) {
  return useFetch<unknown, { code: string }>('/play/' + gameId, 'GET', false);
}
