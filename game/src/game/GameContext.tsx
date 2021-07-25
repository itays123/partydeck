import { useEffect } from 'react';
import { createContext, useCallback, useContext, useReducer } from 'react';
import { Wrapper } from '../shared/types';
import { gameReducer, initialGameState } from './gameReducer';
import { IGameContextValue, IGameData } from './types';
import { Contextable, useSession } from './websocketUtils';

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
  const callbackedOpenHandler = useCallback(() => {}, []);
  const callbackedMessageHandler = useCallback((ev: MessageEvent<any>) => {
    const data: Contextable = JSON.parse(ev.data);
    console.log(data);
    if (data.context) dispatch({ type: data.context, payload: data });
  }, []);
  const logStateToConsoleOnDisconnect = useCallback(() => {
    dispatch({ type: 'DISCONNECTED' });
    console.log('inside callback', state.showEndScreen, state.scoreboard);
  }, [state.showEndScreen, state.scoreboard]);
  const [connect, sendMessage] = useSession(
    callbackedOpenHandler,
    callbackedMessageHandler,
    logStateToConsoleOnDisconnect
  );

  useEffect(() => {
    console.log('inside effect', state.showEndScreen, state.scoreboard);
  }, [state.showEndScreen, state.scoreboard]);

  /*
   * Supercharge the websocket connection
   */

  /*
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
          // connect(state.gameCode!, null, state.playerId!);
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
  */

  // deliver the context to the application

  const join = (gameCode: string, name: string) => connect(gameCode, name);
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
        join,
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
