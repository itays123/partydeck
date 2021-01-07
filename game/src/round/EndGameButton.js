import { useGameContext } from '../game/GameContext';
import { useRoundContext } from './RoundContext';

const EndGameButton = () => {
  const { manuallyEndGame } = useGameContext();
  const { isWaitingForRound } = useRoundContext();
  return isWaitingForRound ? (
    <div className="start-btn absolute bottom-0 left-0 right-0">
      <div className="w-screen max-w-screen-sm mx-auto px-4 pb-6">
        <button
          className="w-full dark-button"
          onClick={() => manuallyEndGame()}
        >
          END GAME
        </button>
      </div>
    </div>
  ) : null;
};

export default EndGameButton;
