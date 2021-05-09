import { useGameContext } from '../game/GameContext';
import { useRoundContext } from './RoundContext';
import Waiting from './Waiting';

const LoadingFeedback = () => {
  const { playerWon, judge, skipped, isAdmin } = useGameContext();
  const {
    isWaitingForJudge,
    isWaitingForPlayers,
    isWaitingForRound,
  } = useRoundContext();
  return (
    <>
      {isWaitingForPlayers && <Waiting text="Waiting for Players..." />}
      {isWaitingForJudge && <Waiting text={`Waiting for ${judge}...`} />}
      {isWaitingForRound && !skipped && (
        <div className="text-center text-gray-100 text-lg mt-2">
          {playerWon} Won!
        </div>
      )}
      {isWaitingForRound && !isAdmin && (
        <Waiting text={'Waiting for game admin...'} />
      )}
    </>
  );
};

export default LoadingFeedback;
