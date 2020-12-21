import { useRoundContext } from '../round/RoundContext';
import CardPicker from './CardPicker';

const Deck = () => {
  const { use, pick } = useRoundContext();
  const pickMode = pick.length > 0;
  console.log(pickMode);
  return (
    <div className="deck container mx-auto overflow-y-hidden">
      <CardPicker cards={pickMode ? pick : use} />
    </div>
  );
};

export default Deck;
