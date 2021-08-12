import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../../auth/AuthContext';
import useDebouncedValue from '../../helpers/useDebouncedValue';
import GameEditorContextProvider, {
  GameEditorProviderProps,
  useGameEditorContext,
} from '../GameEditorContext';
import { Game } from '../types';
import { useHardIsChanged } from './useHardIsChanged';
import { SaveReqBody } from './useSaveGame';

export function useSaveGameOnChange(
  fetchSave: (body: SaveReqBody) => Promise<any>,
  isSaveLoading: boolean,
  refreshedGame: Game
) {
  const { isPrivate, questions, answers, isChanged } = useGameEditorContext();
  const debouncedIsChanged = useHardIsChanged();
  const debouncedSaveLoading = useDebouncedValue(isSaveLoading, 250); // do not save more than one second after save is done
  const { refresh } = useGameEditorContext();

  const saveCallback = useCallback(() => {
    if (
      !isSaveLoading &&
      !debouncedSaveLoading &&
      refresh &&
      isChanged &&
      debouncedIsChanged
    ) {
      return fetchSave({
        isPrivate,
        questions: questions.changes,
        answers: answers.changes,
      });
    }
  }, [
    isPrivate,
    questions.changes,
    answers.changes,
    fetchSave,
    isSaveLoading,
    refresh,
    isChanged,
    debouncedIsChanged,
    debouncedSaveLoading,
  ]);

  useEffect(() => {
    saveCallback();
  }, [saveCallback]);

  useEffect(() => {
    window.addEventListener('beforeunload', saveCallback as (ev: Event) => any);
    return () =>
      window.removeEventListener(
        'beforeunload',
        saveCallback as (ev: Event) => any
      );
  }, [saveCallback]);

  useEffect(() => {
    if (
      refreshedGame.name &&
      refreshedGame.lng &&
      refreshedGame.author &&
      refresh
    )
      refresh(refreshedGame);
  }, [refresh, refreshedGame]);

  return saveCallback;
}

export function withRefreshableGame(
  Component: React.ComponentType<GameEditorProviderProps>
) {
  return function RefreshableGameEditorProvider({
    children,
    initialGame,
  }: Omit<GameEditorProviderProps, 'refresh'>) {
    const [reactiveInitialGame, setInitialGame] = useState(initialGame);
    const { user } = useAuthContext();
    const refresh = useCallback(
      (game: Game) => {
        setInitialGame({ ...game, author: user });
      },
      [user]
    );
    return (
      <Component initialGame={reactiveInitialGame} refresh={refresh}>
        {children}
      </Component>
    );
  };
}

export const RefreshableGameEditorProvider = withRefreshableGame(
  GameEditorContextProvider
);
