import { useGameContext } from '../game/GameContext';

const WinnerDisplay = () => {
  const { playerWon } = useGameContext();
  return (
    <div className="text-center text-gray-100 text-lg mt-2">
      {playerWon} Won!
    </div>
  );
};

export default WinnerDisplay;
