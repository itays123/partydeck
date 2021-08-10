import { useCurrentRound } from '../../game/GameContext';

export default function RoundWinnerDisplay() {
  const { playerWon } = useCurrentRound();
  return (
    <div className="text-center text-gray-100 text-lg mt-2">
      {playerWon} Won!
    </div>
  );
}
