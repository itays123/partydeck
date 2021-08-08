import { useFetch } from '../../shared/helpers/useFetch';

export function useCreateLiveGame(gameId: string) {
  return useFetch<unknown, { code: string }>(
    '/api/play/' + gameId,
    'GET',
    false
  );
}
