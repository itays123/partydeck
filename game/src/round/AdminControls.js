import { useGameContext } from '../game/GameContext';
import { useRoundContext } from './RoundContext';

const AdminControls = () => {
  const {
    isAdmin,
    manuallyEndGame,
    overrideSkip,
    requestNextRound,
  } = useGameContext();
  const {
    isWaitingForPlayers,
    isWaitingForJudge,
    isWaitingForRound,
  } = useRoundContext();
  return isAdmin ? (
    <div className="start-btn absolute bottom-0 left-0 right-0">
      <div className="w-screen max-w-screen-sm mx-auto px-4 pb-6 flex items-center justify-center space-x-4">
        {isWaitingForRound && (
          <>
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
          </>
        )}
        {(isWaitingForJudge || isWaitingForPlayers) && (
          <button className="w-full dark-button" onClick={() => overrideSkip()}>
            SKIP
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default AdminControls;
