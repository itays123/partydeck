import { useEffect } from 'react';
import { useCallback } from 'react';
import { createContext, useContext, useReducer } from 'react';
import { Wrapper } from '../shared/types';
import { gameReducer, initialGameState } from './gameReducer';
import { IGameContextValue, IGameData } from './types';
import {
  connect,
  connectedAtom,
  Contextable,
  useSession,
} from './websocketUtils';

export const GameContext = createContext<IGameContextValue>(
  {} as IGameContextValue
);

export function useGameContext() {
  return useContext(GameContext);
}

type Reducer = (state: IGameData, action: any) => IGameData;

export default function GameContextProvider({ children }: Wrapper) {
  const [state, dispatch] = useReducer(
    gameReducer as Reducer,
    initialGameState as IGameData
  );
  const [onMessage, sendMessage] = useSession();

  // wire the session and game state managment system together

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    onMessage(evt => {
      const data: Contextable = JSON.parse(evt.data);
      console.log(data);
      if (data.context) dispatch({ type: data.context, payload: data });
    });
  }, []);

  /*
   * Supercharge the websocket connection
   */

  const connectionStateCallback = useCallback(
    (connected: boolean) => {
      if (!connected) {
        if (!state.showEndScreen) {
          // disconnection is unexpected
          console.log('unexpected disconnection');
          setTimeout(() => {
            if (!state.isConnectionResumed) dispatch({ type: 'DISCONNECTED' });
          }, 30 * 1000);
          dispatch({ type: 'SESSION_PAUSED' });
          connect(state.gameCode!, null, state.playerId!);
        } else dispatch({ type: 'DISCONNECTED' });
      }
    },
    [
      state.showEndScreen,
      state.gameCode,
      state.playerId,
      state.isConnectionResumed,
    ]
  );

  connectedAtom.subscribe(connectionStateCallback);

  // deliver the context to the application

  const start = () => sendMessage({ context: 'START' });
  const overrideSkip = () => sendMessage({ context: 'SKIP' });
  const requestNextRound = () => sendMessage({ context: 'NEXT' });
  const manuallyEndGame = () => sendMessage({ context: 'STOP' });
  const onCardClick = (cardId: string) =>
    dispatch({ type: 'CARD_SELECTED', payload: { selected: cardId } });
  const onCardButtonClick = () => {
    if (state.useMode && !state.isJudge) {
      dispatch({ type: 'CARD_USED' });
      sendMessage({ used: state.selectedCardId, context: 'USED' });
    } else if (!state.useMode && state.isJudge) {
      sendMessage({ picked: state.selectedCardId, context: 'PICKED' });
    }
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
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
