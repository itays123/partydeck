import { Card as CardType } from '../../game/types';
import Card from './Card';

type Props = {
  cards: CardType[];
};

const CardPicker = ({ cards }: Props) => {
  return (
    <div className="card-picker flex flex-wrap mt-4 justify-center pb-2">
      {cards.map(card => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default CardPicker;
