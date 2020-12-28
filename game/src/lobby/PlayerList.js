import { useEffect } from 'react';
import { useGameContext } from '../game/GameContext';

const PlayerList = () => {
  const { players } = useGameContext();

  return (
    <div className="player-list flex flex-row-reverse flex-wrap max-h-96 lg:max-h-72 overflow-y-scroll no-scrollbar">
      {players.map((p, i) => (
        <div
          className="player text-gray-100 text-center w-1/2 md:w-1/3 lg:w-1/4 my-6 text-lg"
          key={i}
        >
          {p}
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
