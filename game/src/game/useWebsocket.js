import { useState } from 'react';

export function useWebsocket(context) {
  const { setGameCode, setRound } = context;
  const [players, setPlayers] = useState([
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
  ]);

  return {
    join: (gameCode, name) => {
      setGameCode(gameCode);
    },
    start: () => {
      setRound(1);
    },
    players,
  };
}
