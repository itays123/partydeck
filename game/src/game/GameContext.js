import { createContext, useContext, useState } from 'react';
import Lobby from '../lobby/Lobby';
import { useWebsocket } from './useWebsocket';

const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const [round, setRound] = useState(0);
  const [playerCount, setPlayerCount] = useState(3);
  const [isAdmin, setAdmin] = useState(true);
  const [gameCode, setGameCode] = useState(undefined);
  const context = {
    round,
    playerCount,
    isAdmin,
    gameCode,
    setRound,
    setPlayerCount,
    setAdmin,
    setGameCode,
  };
  const websocket = useWebsocket(context);
  return (
    <GameContext.Provider value={{ ...context, ...websocket }}>
      {round === 0 ? <Lobby /> : children}
    </GameContext.Provider>
  );
};

export function useGameContext() {
  const context = useContext(GameContext);
  return context;
}

export default GameContextProvider;
