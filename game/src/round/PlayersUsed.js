import { useGameContext } from '../game/GameContext';
import { useRoundContext } from './RoundContext';
import { motion } from 'framer-motion';

const PlayersUsed = () => {
  const { playersUsed } = useGameContext();
  const { isWaitingForPlayers } = useRoundContext();
  return isWaitingForPlayers ? (
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
  ) : null;
};

export default PlayersUsed;
