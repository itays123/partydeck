import { useGameContext } from '../game/GameContext';
import { useRoundContext } from '../round/RoundContext';
import CardPicker from './CardPicker';

const Deck = () => {
  const { use, pick, useMode } = useGameContext();
  return (
    <div className="deck container mx-auto overflow-y-hidden">
      <CardPicker cards={useMode ? use : pick} />
    </div>
  );
};

export default Deck;
