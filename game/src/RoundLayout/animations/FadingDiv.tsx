import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Wrapper } from '../../components/types';
import { useCurrentRound } from '../../game/GameContext';

const variants: Variants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 1.0,
      delay: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.3,
    },
  },
};

export default function FadingDiv({
  children,
  className,
}: Wrapper & { className?: string }) {
  const { status } = useCurrentRound();
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={status}
        className={className}
        variants={variants}
        initial="initial"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
