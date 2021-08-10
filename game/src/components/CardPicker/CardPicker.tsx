import { useEffect } from 'react';
import { useCurrentRound, useGameContext } from '../../game/GameContext';
import Next from '../icons/Next';
import Prev from '../icons/Prev';
import { AnimatedAnswerCard } from './animations/AnimatedAnswerCard';
import { useSwipes } from './useSwipes';

export function CardPicker({ of }: { of: 'use' | 'pick' }) {
  const { [of]: deck } = useCurrentRound();
  const { onCardClick } = useGameContext();
  const {
    selectedIndex,
    swipeLeftAllowed,
    swipeRightAllowed,
    swipeLeft,
    swipeRight,
  } = useSwipes(deck!);

  // inform the context when the selected card changes
  useEffect(() => {
    onCardClick(deck?.[selectedIndex]?.id!);
  }, [selectedIndex, deck, onCardClick]);

  return (
    <div className="flex justify-center items-center w-full mt-8">
      <button
        onClick={swipeLeft}
        disabled={!swipeLeftAllowed}
        className="text-white disabled:opacity-50 focus:outline-none"
      >
        <Prev width={32} height={32} />
      </button>
      <div className="relative h-48 w-cardpicker-sm md:w-cardpicker-md">
        {deck?.map((card, index) => (
          <AnimatedAnswerCard
            position={index - selectedIndex}
            key={card.id}
            content={card.content}
            swipeLeft={swipeLeft}
            swipeRight={swipeRight}
          />
        ))}
      </div>
      <button
        onClick={swipeRight}
        disabled={!swipeRightAllowed}
        className="text-white disabled:opacity-50 focus:outline-none"
      >
        <Next width={32} height={32} />
      </button>
    </div>
  );
}
