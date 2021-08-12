import { useEffect } from 'react';
import { useCurrentRound, useGameContext } from '../../game/GameContext';
import Next from '../icons/Next';
import Prev from '../icons/Prev';
import { AnimatedAnswerCard } from './animations/AnimatedAnswerCard';
import { useCards } from './useCards';
import { useSwipes } from './useSwipes';

export function CardPicker({ of }: { of: 'use' | 'pick' }) {
  const { [of]: deck } = useCurrentRound();
  const { onCardClick } = useGameContext();
  const {
    selectedIndex,
    swipeDir,
    swipeLeftAllowed,
    swipeRightAllowed,
    swipeLeft,
    swipeRight,
  } = useSwipes(deck!);
  const { previousCard, currentCard, nextCard } = useCards(
    selectedIndex,
    deck!
  );

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
      <div className="relative h-48 w-cardpicker-sm md:w-cardpicker-md overflow-x-hidden">
        <AnimatedAnswerCard
          key={previousCard?.id || 'prev'}
          id={previousCard?.id || 'prev'}
          position={-1}
          swipeDir={swipeDir}
          content={previousCard?.content}
        />
        <AnimatedAnswerCard
          key={currentCard?.id || 'current'}
          id={currentCard?.id || 'currrent'}
          position={0}
          swipeDir={swipeDir}
          content={currentCard?.content}
          swipeLeft={swipeLeft}
          swipeRight={swipeRight}
        />
        <AnimatedAnswerCard
          key={nextCard?.id || 'next'}
          id={nextCard?.id || 'next'}
          position={1}
          swipeDir={swipeDir}
          content={nextCard?.content}
        />
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
