/**
 *
 * @param {{ cards: { id: string, value: string }[] }} props
 */
const CardPicker = ({ cards }) => {
  return (
    <div className="card-picker flex flex-wrap mt-4 justify-center overflow-y-scroll md:overflow-y-hidden max-h-96 md:max-h-full">
      {cards.map(({ id, value }) => (
        <div
          className="w-64 md:w-32 h-80 md:h-48 rounded shadow m-1 md:m-2 px-1 md:px-2 bg-gray-200 flex justify-center items-center text-center"
          key={id}
        >
          <p className="text-2xl md:text-xl">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default CardPicker;
