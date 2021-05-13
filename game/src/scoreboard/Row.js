/**
 *
 * @param {{ nickname: string, score: number }} param0
 */
const Row = ({ nickname, score }) => {
  return (
    <div className="score-row flex justify-between bg-gray-100 my-2 shadow py-2 px-6">
      <p className="font-bold">{nickname}</p>
      <p className="text-purple-800">{score}</p>
    </div>
  );
};

export default Row;
