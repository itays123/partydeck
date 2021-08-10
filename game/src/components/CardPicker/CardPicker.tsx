import { useEffect } from 'react';
import { useState } from 'react';
import { useCurrentRound, useGameContext } from '../../game/GameContext';
import { useCards } from './useCards';
import Next from '../icons/Next';
import Prev from '../icons/Prev';
import { AnimatedAnswerCard } from './animations/AnimatedAnswerCard';
import { useCallback } from 'react';

export function CardPicker({ of }: { of: 'use' | 'pick' }) {
  const { pickedCardId, [of]: deck, playerWon } = useCurrentRound();
  const { onCardClick } = useGameContext();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { currentCard } = useCards(selectedIndex, deck!);
  const swipeLeft = useCallback(() => {
    selectedIndex > 0 && setSelectedIndex(i => i - 1);
  }, [selectedIndex]);
  const swipeRight = useCallback(() => {
    selectedIndex < deck?.length! - 1 && setSelectedIndex(i => i + 1);
  }, [selectedIndex, deck]);

  // inform the context when the selected card changes
  useEffect(() => {
    onCardClick(currentCard.id);
  }, [currentCard, onCardClick]);

  return (
    <div className="flex justify-center items-center w-full mt-8">
      <button
        onClick={swipeLeft}
        disabled={selectedIndex === 0}
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
            picked={pickedCardId === card.id}
            player={playerWon}
            swipeLeft={swipeLeft}
            swipeRight={swipeRight}
          />
        ))}
      </div>
      <button
        onClick={swipeRight}
        disabled={selectedIndex === deck?.length! - 1}
        className="text-white disabled:opacity-50 focus:outline-none"
      >
        <Next width={32} height={32} />
      </button>
    </div>
  );
}
