import { createContext } from 'react';
import { action } from '../buttonFactory';
import Edit from '../glyphs/Edit';
import Remove from '../glyphs/Remove';
import Play from '../glyphs/Play';
import { withClass, Wrapper } from '../types';
import { useHistory } from 'react-router-dom';
import { useDeleteGame } from '../../game/action/useDeleteGame';
import { LiveGameCreationContext } from '../../game/play/LiveGameModalProvider';

interface IGameActions {
  remove(): void;
  viewEdit(): void;
}

const GameActionsContext = createContext({} as IGameActions);

export const LinkableGameName = ({
  name,
  className,
}: { name: string } & withClass) =>
  action(name, GameActionsContext, ctx => ctx.viewEdit())({ className });
export const EditButton = action(Edit, GameActionsContext, ctx =>
  ctx.viewEdit()
);
export const RemoveButton = action(Remove, GameActionsContext, ctx =>
  ctx.remove()
);
export const PlayButton = action(Play, LiveGameCreationContext, ctx =>
  ctx.createLiveGame()
);

export function GameActionsProvider({
  children,
  gameId,
}: Wrapper & { gameId: string }) {
  const { push } = useHistory();
  const { remove } = useDeleteGame(gameId);
  return (
    <GameActionsContext.Provider
      value={{
        viewEdit: () => push('/game/' + gameId),
        remove,
      }}
    >
      {children}
    </GameActionsContext.Provider>
  );
}
