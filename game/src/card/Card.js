import { useGameContext } from '../game/GameContext';

const Card = ({ id, value }) => {
  const { onCardClick } = useGameContext();
  return (
    <div
      className="w-64 md:w-32 h-80 md:h-48 rounded shadow m-1 md:m-2 px-1 md:px-2 bg-gray-200 flex justify-center items-center text-center"
      onClick={() => onCardClick(id)}
    >
      <p className="text-2xl md:text-xl">{value}</p>
    </div>
  );
};

export default Card;
