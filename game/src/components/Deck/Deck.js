import { useGameContext } from '../../game/GameContext';
import CardPicker from './CardPicker';

const Deck = () => {
  const { use, pick, useMode } = useGameContext();
  return (
    <div className="deck-wrapper">
      <div className="deck container mx-auto overflow-y-hidden relative">
        <CardPicker cards={useMode ? use : pick} />
      </div>
    </div>
  );
};

export default Deck;
