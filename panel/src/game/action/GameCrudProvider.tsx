import { createContext } from 'react';
import { action } from '../../components/buttonFactory';
import { createWrapper } from '../../components/logicalWrapeprFactory';
import Remove from '../../components/glyphs/Remove';
import { Wrapper } from '../../components/types';
import { useSaveGame } from './useSaveGame';
import { useDeleteGame } from './useDeleteGame';
import { useSaveGameOnChange } from './useSaveGameOnChange';
import { Action } from '../types';

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
  const { save, isSaveLoading, refreshedGame } = useSaveGame(gameId);
  const { remove, isLoading } = useDeleteGame(gameId);

  const saveCallback = useSaveGameOnChange(save, isSaveLoading, refreshedGame);

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
