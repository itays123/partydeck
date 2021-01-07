import Card from './Card';

/**
 *
 * @param {{ cards: { id: string, value: string }[] }} props
 */
const CardPicker = ({ cards }) => {
  return (
    <div className="card-picker flex flex-wrap sm:mt-4 md:mt-0 justify-center overflow-y-scroll pt-2 md:overflow-y-hidden max-h-96 md:max-h-full">
      {cards.map(card => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default CardPicker;
