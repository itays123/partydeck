import { createContext, useContext, useState } from 'react';
import Lobby from './Lobby';

const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const [round, setRound] = useState(0);
  const [playerCount, setPlayerCount] = useState(1);
  const [isAdmin, setAdmin] = useState(false);
  const [gameCode, setGameCode] = useState('123456');
  return (
    <GameContext.Provider value={{ round, isAdmin }}>
      {round === 0 ? (
        <Lobby
          playerCount={playerCount}
          isAdmin={isAdmin}
          gameCode={gameCode}
        />
      ) : (
        children
      )}
    </GameContext.Provider>
  );
};

export function useGameContext() {
  const context = useContext(GameContext);
  console.log(context);
  return context;
}

export default GameContextProvider;
