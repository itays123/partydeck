import { useEffect } from 'react';
import { useState } from 'react';
import { useCurrentRound, useGameContext } from '../../game/GameContext';
import { AnswerCard } from './AnswerCard';
import { useCards } from './useCards';
import { useSubscribeToPickedCardId } from './useSubscribeToPickedCardId';
import Next from '../icons/Next';
import Prev from '../icons/Prev';

export function CardPicker({ of }: { of: 'use' | 'pick' }) {
  const { pickedCardId, [of]: deck } = useCurrentRound();
  const { onCardClick } = useGameContext();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { previousCard, currentCard, nextCard } = useCards(
    selectedIndex,
    deck!
  );

  // inform the context when the selected card changes
  useEffect(() => {
    onCardClick(currentCard.id);
  }, [currentCard, onCardClick]);

  // focus on picked card when picked
  useSubscribeToPickedCardId(deck!, setSelectedIndex);

  return (
    <div className="card-picker flex items-center py-8 space-x-4">
      <button
        onClick={() => setSelectedIndex(i => i - 1)}
        disabled={selectedIndex === 0}
        className="text-white disabled:opacity-50 focus:outline-none"
      >
        <Prev width={32} height={32} />
      </button>
      <div className="hidden md:block">
        <AnswerCard key={selectedIndex} content={previousCard?.content} />
      </div>
      <AnswerCard
        key={selectedIndex}
        content={currentCard.content}
        selected={true}
        picked={pickedCardId === currentCard.id}
      />
      <div className="hidden md:block">
        <AnswerCard key={selectedIndex} content={nextCard?.content} />
      </div>
      <button
        onClick={() => setSelectedIndex(i => i + 1)}
        disabled={selectedIndex === deck?.length! - 1}
        className="text-white disabled:opacity-50 focus:outline-none"
      >
        <Next width={32} height={32} />
      </button>
    </div>
  );
}
