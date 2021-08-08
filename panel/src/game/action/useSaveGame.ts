import { useFetch } from '../../shared/helpers/useFetch';
import { Changes } from '../types';

type Body = { isPrivate: boolean; questions: Changes; answers: Changes };

export function useSaveGame(gameId: string) {
  const { isLoading, doFetch } = useFetch<Body>(
    '/game/' + gameId,
    'PUT',
    false
  );

  return {
    isSaveLoading: isLoading,
    save(changes: Body) {
      return doFetch(changes);
    },
  };
}
