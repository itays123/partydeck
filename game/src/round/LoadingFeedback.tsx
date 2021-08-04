import {
  WaitingForPlayersOnly,
  WaitingForJudgeOnly,
  PendingNextRoundOnly,
  NotSkippedOnly,
  NotAdmin,
} from '../game/gameContextFilters';
import PlayersUsed from './PlayersUsed';
import Waiting from './Waiting';
import WaitingForJudge from './WaitingForJudge';
import WinnerDisplay from './WinnerDisplay';

const LoadingFeedback = () => {
  return (
    <>
      <WaitingForPlayersOnly>
        <Waiting text="Waiting for Players..." />
        <PlayersUsed />
      </WaitingForPlayersOnly>
      <WaitingForJudgeOnly>
        <WaitingForJudge />
      </WaitingForJudgeOnly>
      <PendingNextRoundOnly>
        <NotSkippedOnly>
          <WinnerDisplay />
        </NotSkippedOnly>
        <NotAdmin>
          <Waiting text="Waiting for game admin..." />
        </NotAdmin>
      </PendingNextRoundOnly>
    </>
  );
};

export default LoadingFeedback;
