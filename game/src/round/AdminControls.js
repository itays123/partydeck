import AdminOnly from '../game/filters/AdminOnly';
import { useGameContext } from '../game/GameContext';
import PendingNextRoundOnly from './filters/PendingNextRoundOnly';
import WaitingForJudgeOnly from './filters/WaitingForJudgeOnly';
import WaitingForPlayersOnly from './filters/WaitingForPlayersOnly';
const AdminControls = () => {
  const { manuallyEndGame, overrideSkip, requestNextRound } = useGameContext();
  return (
    <AdminOnly>
      <div className="start-btn absolute bottom-0 left-0 right-0">
        <div className="w-screen max-w-screen-sm mx-auto px-4 pb-6 flex items-center justify-center space-x-4">
          <PendingNextRoundOnly>
            <button
              className="w-full dark-button"
              onClick={() => requestNextRound()}
            >
              NEXT
            </button>
            <button
              className="w-full dark-button"
              onClick={() => manuallyEndGame()}
            >
              END GAME
            </button>
          </PendingNextRoundOnly>
          <WaitingForJudgeOnly>
            <button
              className="w-full dark-button"
              onClick={() => overrideSkip()}
            >
              SKIP
            </button>
          </WaitingForJudgeOnly>
          <WaitingForPlayersOnly>
            <button
              className="w-full dark-button"
              onClick={() => overrideSkip()}
            >
              SKIP
            </button>
          </WaitingForPlayersOnly>
        </div>
      </div>
    </AdminOnly>
  );
};

export default AdminControls;
