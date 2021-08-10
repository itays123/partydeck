import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, RefObject } from 'react';
import { SwipeDir } from '../useSwipes';
import EditableCard, { EditableCardProps } from './EditableCard';

export const variants = {
  enter: ([position, direction]: [number, SwipeDir]) => {
    // will either be -2 (enter from left) or 2 (enter from right)
    return {
      x: direction > 0 ? 250 : -250,
      opacity: 0,
      zIndex: 0,
    };
  },
  visible: ([position, direction]: [number, SwipeDir]) => {
    return {
      zIndex: position === 0 ? 2 : 1,
      x: 120 * position, // -120, 0 or 120
      opacity: 1,
      scale: position === 0 ? 1 : 2 / 3,
      transition: {
        x: { delay: position === 0 ? 0.2 : 0 },
      },
    };
  },
  exit: ([position, direction]: [number, SwipeDir]) => {
    // will either be -2 (exit to left) or 2 (exit to right)
    return {
      zIndex: 0,
      x: direction < 0 ? 250 : -250,
      opacity: 0,
    };
  },
};

const motionCardForwardRef = forwardRef<HTMLDivElement, EditableCardProps>(
  (props, ref) => (
    <EditableCard {...props} innerRef={ref as RefObject<HTMLDivElement>} />
  )
);

const MotionEditableCard = motion(motionCardForwardRef);

type Swipeable = {
  position: number;
  swipeDir: SwipeDir;
  id: number | string;
  swipeLeft?: Function;
  swipeRight?: Function;
};

export function AnimatedEditableCard({
  position,
  swipeDir,
  id,
  swipeLeft,
  swipeRight,
  ...props
}: Partial<EditableCardProps> & Swipeable) {
  return (
    <AnimatePresence initial={false} custom={[position, swipeDir]}>
      {props.atom && (
        <MotionEditableCard
          atom={props.atom}
          focused={props.focused || false}
          canDelete={props.canDelete || false}
          onDeletePress={props.onDeletePress || (() => {})}
          key={id}
          custom={[position, swipeDir]}
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

            if (swipePower < -3000 && swipeRight) {
              swipeRight();
            } else if (swipePower > 3000 && swipeLeft) {
              swipeLeft();
            }
          }}
        />
      )}
    </AnimatePresence>
  );
}
