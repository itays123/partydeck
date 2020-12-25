import { createContext, useContext, useState } from 'react';
import Lobby from '../lobby/Lobby';
import { useWebsocket } from './useWebsocket';

const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const [round, setRound] = useState(0);
  const [playerCount, setPlayerCount] = useState(1);
  const [isAdmin, setAdmin] = useState(false);
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
  const { join } = useWebsocket(context);
  return (
    <GameContext.Provider value={{ ...context, join }}>
      {round === 0 ? <Lobby /> : children}
    </GameContext.Provider>
  );
};

export function useGameContext() {
  const context = useContext(GameContext);
  return context;
}

export default GameContextProvider;
