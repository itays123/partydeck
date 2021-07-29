import { useEffect } from 'react';
import { createContext, useContext, useReducer } from 'react';
import { Wrapper } from '../shared/types';
import {
  useConnectionCallback,
  useConnectionPauseHandler,
  useMessageCallback,
} from './eventHandlers';
import { gameReducer, initialGameState } from './gameReducer';
import { IGameContextValue, IGameData, RoundLifecycle } from './types';
import { useSession } from './websocketUtils';

export const GameContext = createContext<IGameContextValue>(
  {} as IGameContextValue
);

export function useGameContext() {
  return useContext(GameContext);
}

export function useCurrentRound() {
  return useContext(GameContext).roundState;
}

type Reducer = (state: IGameData, action: any) => IGameData;

export default function GameContextProvider({ children }: Wrapper) {
  const [state, dispatch] = useReducer(
    gameReducer as Reducer,
    initialGameState as IGameData
  );
  const onOpen = useConnectionCallback();
  const onMessage = useMessageCallback(dispatch);
  const [setConnectFn, onClose] = useConnectionPauseHandler(state, dispatch);
  const [connect, sendMessage, closeConn] = useSession(
    onOpen,
    onMessage,
    onClose
  );

  // wire everything
  useEffect(() => {
    console.log('wiring everything...');
    setConnectFn(connect);
  }, [setConnectFn, connect]);

  // deliver the context to the application

  const join = (gameCode: string, name: string) => connect(gameCode, name);
  const reconnect = (gameCode: string, playerId: string) => {
    dispatch({
      type: 'RECONNECTION_AFTER_RENDER',
      payload: { gameCode, playerId },
    });
    connect(gameCode, null, playerId);
  };
  const close = () => {
    dispatch({ type: 'GOING_AWAY' });
    closeConn();
  };
  const start = () => sendMessage({ context: 'START' });
  const overrideSkip = () => sendMessage({ context: 'SKIP' });
  const requestNextRound = () => sendMessage({ context: 'NEXT' });
  const manuallyEndGame = () => sendMessage({ context: 'STOP' });
  const onCardClick = (cardId: string) =>
    dispatch({ type: 'CARD_SELECTED', payload: { selected: cardId } });
  const onCardButtonClick = () => {
    const { roundState } = state;
    if (roundState.status === RoundLifecycle.USE) {
      dispatch({ type: 'CARD_USED' });
      sendMessage({ used: roundState.selectedCardId, context: 'USED' });
    } else if (roundState.status === RoundLifecycle.PICK) {
      sendMessage({ picked: roundState.selectedCardId, context: 'PICKED' });
    }
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        join,
        reconnect,
        close,
        start,
        overrideSkip,
        requestNextRound,
        manuallyEndGame,
        onCardClick,
        onCardButtonClick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
