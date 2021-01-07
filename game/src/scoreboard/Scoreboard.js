import { useGameContext } from '../game/GameContext';
import Row from './Row';

const Scoreboard = () => {
  const { scoreboard } = useGameContext();
  return (
    <div className="scoreboard container mx-auto">
      <div className="text-4xl text-center text-gray-100 my-4">Game Ended!</div>
      <div className="text-2xl text-center text-gray-100 my-4">Scoreboard</div>
      {scoreboard.map((player, i) => (
        <Row {...player} key={i} />
      ))}
    </div>
  );
};

export default Scoreboard;
