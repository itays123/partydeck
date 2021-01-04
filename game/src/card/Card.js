import { useGameContext } from '../game/GameContext';

const Card = ({ id, value }) => {
  const {
    onCardClick,
    selectedCardId,
    useMode,
    onCardButtonClick,
    isJudge,
  } = useGameContext();
  const showUseButton =
    ((isJudge && !useMode) || (!isJudge && useMode)) && selectedCardId === id;
  return (
    <div
      className="w-64 md:w-32 h-80 md:h-48 rounded shadow m-1 md:m-2 px-1 md:px-2 bg-gray-200 flex justify-center items-center text-center relative"
      onClick={() => onCardClick(id)}
    >
      <p className="text-2xl md:text-xl">{value}</p>
      {showUseButton && (
        <button
          className="absolute bottom-0 bg-gray-500 py-2 w-full rounded-b text-gray-100"
          onClick={() => onCardButtonClick()}
        >
          {useMode ? 'USE' : 'PICK'}
        </button>
      )}
    </div>
  );
};

export default Card;
