/**
 *
 * @param {{ nickname: string, cardsWon: { size: number } }} param0
 */
const Row = ({ nickname, cardsWon }) => {
  return (
    <div className="score-row flex justify-between bg-gray-100 my-2 shadow py-2 px-6">
      <p className="font-bold">{nickname}</p>
      <p className="text-purple-800">{cardsWon.size}</p>
    </div>
  );
};

export default Row;
