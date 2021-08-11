import { createContext } from 'react';
import { action } from '../../components/buttonFactory';
import { createWrapper } from '../../components/logicalWrapeprFactory';
import Remove from '../../components/glyphs/Remove';
import { Wrapper } from '../../components/types';
import { useGameEditorContext } from '../GameEditorContext';
import { useSaveGame } from './useSaveGame';
import { useDeleteGame } from './useDeleteGame';
import { useCallback } from 'react';
import { useSaveGameOnChange } from './useSaveGameOnChange';

type Action = {
  isLoading: boolean;
  doFetch(): void;
};

interface IGameCrud {
  save: Action;
  remove: Action;
}

export const GameCrudContext = createContext({} as IGameCrud);

export const SaveLoading = createWrapper(
  GameCrudContext,
  ctx => ctx.save.isLoading
);
export const SaveNotLoading = createWrapper(
  GameCrudContext,
  ctx => !ctx.save.isLoading
);
export const RemoveButton = action(Remove, GameCrudContext, ctx =>
  ctx.remove.doFetch()
);

export default function GameCrudProvider({
  children,
  gameId,
}: Wrapper & { gameId: string }) {
  const { save, isSaveLoading } = useSaveGame(gameId);
  const { remove, isLoading } = useDeleteGame(gameId);
  const { isPrivate, questions, answers, refresh, clearState } =
    useGameEditorContext();
  const saveCallback = useCallback(() => {
    if (!isSaveLoading)
      save({
        isPrivate,
        questions: questions.changes(),
        answers: answers.changes(),
      })
        .then(() => refresh && refresh())
        .then(clearState);
  }, [isPrivate, questions, answers, save, isSaveLoading, clearState, refresh]);

  useSaveGameOnChange(saveCallback);

  return (
    <GameCrudContext.Provider
      value={{
        save: { doFetch: saveCallback, isLoading: isSaveLoading },
        remove: { doFetch: remove, isLoading },
      }}
    >
      {children}
    </GameCrudContext.Provider>
  );
}
