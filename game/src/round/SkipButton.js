import { useGameContext } from '../game/GameContext';

const SkipButton = () => {
  const { overrideSkip } = useGameContext();
  return (
    <div className="start-btn absolute bottom-0 left-0 right-0">
      <div className="w-screen max-w-screen-sm mx-auto px-4 pb-6">
        <button className="w-full dark-button" onClick={() => overrideSkip()}>
          SKIP
        </button>
      </div>
    </div>
  );
};

export default SkipButton;
