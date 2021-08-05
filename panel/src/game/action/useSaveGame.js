import { useFetch } from '../../shared/helpers/useFetch';

export function useSaveGame(gameId) {
  const { isLoading, doFetch } = useFetch('/game/' + gameId, 'PUT', false);

  return {
    isSaveLoading: isLoading,
    save(changes) {
      return doFetch(changes);
    },
  };
}
