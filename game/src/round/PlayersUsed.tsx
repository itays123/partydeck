import { useCurrentRound } from '../game/GameContext';
import { motion } from 'framer-motion';

const PlayersUsed = () => {
  const { playersUsed } = useCurrentRound();
  return (
    <div>
      <div className="text-center text-gray-100 text-lg mt-4">
        {playersUsed.size > 0 && 'Received Answers From...'}
      </div>
      {[...playersUsed.keys()].map(key => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, type: 'tween' }}
          className="text-center text-gray-100 text-md mt-2"
        >
          {playersUsed.get(key)}
        </motion.div>
      ))}
    </div>
  );
};

export default PlayersUsed;
