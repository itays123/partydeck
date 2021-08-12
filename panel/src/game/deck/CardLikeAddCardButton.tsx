import { AnimatePresence, motion } from 'framer-motion';
import { MouseEventHandler } from 'react';
import Add from '../../components/icons/Add';

const variants = {
  enter: {
    x: 250,
    opacity: 0,
    zIndex: 0,
  },
  visible: {
    zIndex: 1,
    x: 120, // -150, 0 or 150
    opacity: 1,
    scale: 2 / 3,
  },
  exit: {
    zIndex: 0,
    x: -250,
    opacity: 0,
  },
};

interface Props {
  addCard: Function;
}

export function CardLikeAddCardButton({ addCard }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        className="card flex items-center justify-center cursor-pointer"
        onClick={addCard as MouseEventHandler}
        variants={variants}
        initial="enter"
        animate="visible"
        exit="exit"
      >
        <Add width={48} height={48} className="text-theme-800" />
      </motion.div>
    </AnimatePresence>
  );
}
