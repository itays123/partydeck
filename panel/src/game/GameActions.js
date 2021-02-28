const GameActions = ({ play = () => {} }) => {
  return (
    <section className="actions flex justify-end">
      <button
        className="play px-3 py-1 ml-4 rounded bg-purple-600 text-gray-100 font-bold"
        onClick={() => play()}
      >
        Play
      </button>
    </section>
  );
};

export default GameActions;
