import { useCurrentRound } from '../../game/GameContext';
import { RoundLifecycle } from '../../game/types';
import CardPicker from './CardPicker';

const Deck = () => {
  const { use, pick, status } = useCurrentRound();
  return (
    <div className="deck-wrapper">
      <div className="deck container mx-auto overflow-y-hidden relative">
        <CardPicker cards={status === RoundLifecycle.USE ? use! : pick} />
      </div>
    </div>
  );
};

export default Deck;
