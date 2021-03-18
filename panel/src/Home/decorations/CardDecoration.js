const SingleCard = ({ selected }) => {
  return (
    <div
      className={`shadow-lg rounded-lg ring-2 ring-yellow-500 h-32 w-24 odd:hidden lg:odd:block ${
        selected ? 'mb-8' : 'mb-0'
      }`}
    ></div>
  );
};

const CardDecoration = () => {
  return (
    <div className="flex-grow flex items-center justify-center space-x-4">
      <SingleCard />
      <SingleCard selected />
      <SingleCard />
      <SingleCard />
    </div>
  );
};

export default CardDecoration;
