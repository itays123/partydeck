import AdminOnly from '../game/filters/AdminOnly';
import NotSkippedOnly from './filters/NotSkippedOnly';
import PendingNextRoundOnly from './filters/PendingNextRoundOnly';
import WaitingForJudgeOnly from './filters/WaitingForJudgeOnly';
import WaitingForPlayersOnly from './filters/WaitingForPlayersOnly';
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
        <AdminOnly inverted>
          <Waiting text="Waiting for game admin..." />
        </AdminOnly>
      </PendingNextRoundOnly>
    </>
  );
};

export default LoadingFeedback;
