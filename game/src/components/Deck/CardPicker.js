import Card from './Card';

/**
 *
 * @param {{ cards: { id: string, value: string }[] }} props
 */
const CardPicker = ({ cards }) => {
  return (
    <div className="card-picker flex flex-wrap mt-4 justify-center pb-2">
      {cards.map(card => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default CardPicker;
