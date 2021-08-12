import { useGameContext } from '../../game/GameContext';

export default function GameCodeDisplay() {
  const { gameCode } = useGameContext();
  return (
    <div className="text-white font-bold text-lg">GAME CODE: {gameCode}</div>
  );
}
