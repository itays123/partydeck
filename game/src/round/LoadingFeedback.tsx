import { NotAdmin } from '../game/gameContextFilters';
import {
  WaitingForPlayersOnly,
  WaitingForJudgeOnly,
  PendingNextRoundOnly,
  NotSkipped,
} from '../RoundLayout/RoundLogicalWrappers';
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
        <NotSkipped>
          <WinnerDisplay />
        </NotSkipped>
        <NotAdmin>
          <Waiting text="Waiting for game admin..." />
        </NotAdmin>
      </PendingNextRoundOnly>
    </>
  );
};

export default LoadingFeedback;
