import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef } from 'react';
import { AnswerCard, AnswerCardProps } from '../AnswerCard';

export const variants = {
  enter: (position: number) => {
    // will either be -2 (enter from left) or 2 (enter from right)
    return {
      x: position > 0 ? 250 : -250,
      opacity: 0,
    };
  },
  visible: (position: number) => {
    return {
      backgroundColor: position === 0 ? '#FFFFFF' : '#C7D2FEDE',
      zIndex: 1,
      x: 150 * position, // -150, 0 or 150
      opacity: 1,
      scale: position === 0 ? 1 : 2 / 3,
      transition: {
        x: { delay: position === 0 ? 0.2 : 0 },
      },
    };
  },
  exit: (position: number) => {
    // will either be -2 (exit to left) or 2 (exit to right)
    return {
      zIndex: 0,
      x: position < 0 ? -250 : 250,
      opacity: 0,
    };
  },
};

const answerCardForwardRef = forwardRef<HTMLDivElement, AnswerCardProps>(
  (props, ref) => <AnswerCard innerRef={ref} {...props} />
);

export const MotionAnswerCard = motion.custom(answerCardForwardRef);

interface AnimatedAnswerCardProps extends Partial<AnswerCardProps> {
  id: string;
  position: number;
  swipeLeft?: () => void;
  swipeRight?: () => void;
}

export function AnimatedAnswerCard({
  id,
  position,
  swipeLeft,
  swipeRight,
  ...props
}: AnimatedAnswerCardProps) {
  return (
    <AnimatePresence initial={false} custom={position}>
      {position >= -1 && position <= 1 && props.content && (
        <MotionAnswerCard
          layout
          key={id}
          content={props.content}
          player={props.player}
          custom={position}
          position={position}
          variants={variants}
          initial="enter"
          animate="visible"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 80, damping: 30 },
            scale: { duration: 0.2 },
            opacity: { duration: 0.2 },
            backgroundColor: { duration: 0.2 },
          }}
          drag={position === 0 ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipePower = Math.abs(offset.x) * velocity.x;

            if (swipePower < -5000 && swipeRight) {
              swipeRight();
            } else if (swipePower > 5000 && swipeLeft) {
              swipeLeft();
            }
          }}
        />
      )}
    </AnimatePresence>
  );
}
