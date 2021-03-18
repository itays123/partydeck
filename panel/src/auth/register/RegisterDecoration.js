const CardSkeleton = ({ ringColor }) => {
  return (
    <div
      className={`shadow-lg rounded-lg ring-2 ring-${ringColor} h-32 w-24 mt-4 ml-4`}
    ></div>
  );
};

const ringColor = {
  0: 'yellow-500',
  1: 'green-400',
  2: 'pink-500',
  3: 'blue-300',
  4: 'purple-600',
};

const RegisterDecoration = () => {
  const items = [];
  for (let i = 0; i < 48; i++)
    items.push(<CardSkeleton ringColor={ringColor[i % 5]} />);
  return (
    <div className="md:flex-grow overflow-hidden md:ml-16 hidden md:block">
      <div className="flex flex-wrap p-4 origin-top-left transform -rotate-45">
        {items}
      </div>
    </div>
  );
};

export default RegisterDecoration;
