import { useFetch } from '../../helpers/useFetch';
import { Changes, Game } from '../types';

export type SaveReqBody = {
  isPrivate: boolean;
  questions: Changes;
  answers: Changes;
};

export function useSaveGame(gameId: string) {
  const { isLoading, doFetch, data } = useFetch<SaveReqBody, Game>(
    '/game/' + gameId,
    'PUT',
    false
  );

  return {
    isSaveLoading: isLoading,
    save: doFetch,
    refreshedGame: data,
  };
}
