import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Wrapper } from '../../components/types';
import { useJoinForm } from '../JoinFormProvider';

const variants: Variants = {
  initial: {
    x: -20,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    zIndex: 1,
    transition: {
      type: 'tween',
      duration: 1.0,
      delay: 0.3,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    zIndex: 0,
    transition: {
      type: 'tween',
      duration: 0.3,
    },
  },
};

export default function SlidingDiv({
  children,
  className,
}: Wrapper & { className?: string }) {
  const { stage } = useJoinForm();
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={stage}
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
