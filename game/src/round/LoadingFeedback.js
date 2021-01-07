import { useRoundContext } from './RoundContext';
import Waiting from './Waiting';

const LoadingFeedback = () => {
  const { isWaitingForJudge, isWaitingForPlayers } = useRoundContext();
  return (
    <>
      {isWaitingForPlayers && <Waiting text="Waiting for Players..." />}
      {isWaitingForJudge && <Waiting text="Waiting for Judge..." />}
    </>
  );
};

export default LoadingFeedback;
