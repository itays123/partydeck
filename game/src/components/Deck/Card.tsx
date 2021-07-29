import { useCurrentRound, useGameContext } from '../../game/GameContext';
import { motion } from 'framer-motion';
import ActivePlayerOnly from '../../round/filters/ActivePlayerOnly';
import { Card as CardProps, RoundLifecycle } from '../../game/types';

const cardVariants = {
  initial: { y: 0 },
  selected: { y: -10 },
};

const Card = ({ id, content }: CardProps) => {
  const { onCardClick, onCardButtonClick } = useGameContext();
  const { selectedCardId, pickedCardId, status, playerWon } = useCurrentRound();
  const isSelected = selectedCardId === id;
  const isPicked = pickedCardId === id;
  return (
    <motion.div
      className="card w-64 md:w-32 h-80 md:h-48 rounded shadow my-4 md:my-2 mx-1 md:mx-2 px-1 md:px-2 bg-gray-200 flex justify-center items-center text-center relative"
      onClick={() => onCardClick(id)}
      variants={cardVariants}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      animate={
        (isSelected && status === RoundLifecycle.USE) || isPicked
          ? 'selected'
          : 'initial'
      }
    >
      <p className="text-2xl md:text-xl">{content.substring(0, 50)}</p>
      {isSelected && (
        <ActivePlayerOnly>
          <button
            className="absolute bottom-0 bg-gray-500 py-2 w-full rounded-b text-gray-100"
            onClick={() => onCardButtonClick()}
          >
            {status === RoundLifecycle.USE ? 'USE' : 'PICK'}
          </button>
        </ActivePlayerOnly>
      )}
      {isPicked && (
        <div className="absolute bottom-0 w-full py-2 font-bold capitalize">
          {playerWon}
        </div>
      )}
    </motion.div>
  );
};

export default Card;
