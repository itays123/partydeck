import { useFetch } from '../../shared/helpers/useAsyncFetch';

export function useSaveGame(gameId) {
  const { isLoading, doFetch } = useFetch('/game/' + gameId, 'PUT', false);

  return {
    isSaveLoading: isLoading,
    save(changes) {
      return doFetch(changes);
    },
  };
}
