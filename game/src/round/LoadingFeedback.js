import { useGameContext } from '../game/GameContext';
import { useRoundContext } from './RoundContext';
import Waiting from './Waiting';

const LoadingFeedback = () => {
  const { playerWon } = useGameContext();
  const {
    isWaitingForJudge,
    isWaitingForPlayers,
    isWaitingForRound,
  } = useRoundContext();
  return (
    <>
      {isWaitingForPlayers && <Waiting text="Waiting for Players..." />}
      {isWaitingForJudge && <Waiting text="Waiting for Judge..." />}
      {isWaitingForRound && (
        <Waiting text={`${playerWon}`.toLocaleUpperCase() + ' Won!'} />
      )}
    </>
  );
};

export default LoadingFeedback;
