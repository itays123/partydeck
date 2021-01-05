import { useGameContext } from '../game/GameContext';
import { motion } from 'framer-motion';

const cardVariants = {
  initial: { y: 0 },
  selected: { y: -10 },
};

const Card = ({ id, value }) => {
  const {
    onCardClick,
    selectedCardId,
    useMode,
    onCardButtonClick,
    isJudge,
  } = useGameContext();
  const isSelected = selectedCardId === id;
  const showUseButton =
    ((isJudge && !useMode) || (!isJudge && useMode)) && isSelected;
  return (
    <motion.div
      className="card w-64 md:w-32 h-80 md:h-48 rounded shadow m-1 md:m-2 px-1 md:px-2 bg-gray-200 flex justify-center items-center text-center relative"
      onClick={() => onCardClick(id)}
      variants={cardVariants}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      animate={showUseButton ? 'selected' : 'initial'}
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
    </motion.div>
  );
};

export default Card;
