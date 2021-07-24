import { createContext, useContext } from 'react';
import { useWebsocket } from './useWebsocket';

export const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const websocket = useWebsocket();
  return (
    <GameContext.Provider value={{ ...websocket }}>
      {children}
    </GameContext.Provider>
  );
};

export function useGameContext() {
  const context = useContext(GameContext);
  return context;
}

export default GameContextProvider;
