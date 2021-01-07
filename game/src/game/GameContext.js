import { createContext, useContext } from 'react';
import Lobby from '../lobby/Lobby';
import { useWebsocket } from './useWebsocket';

const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const websocket = useWebsocket();
  return (
    <GameContext.Provider value={{ ...websocket }}>
      {websocket.round === 0 ? <Lobby /> : children}
    </GameContext.Provider>
  );
};

export function useGameContext() {
  const context = useContext(GameContext);
  return context;
}

export default GameContextProvider;
