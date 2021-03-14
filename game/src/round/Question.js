import { useGameContext } from '../game/GameContext';

const Question = () => {
  const { question, judge, useMode } = useGameContext();
  return (
    <>
      <h1 className="text-center text-gray-100 text-3xl mt-4">{question}</h1>
      {useMode && (
        <h2 className="text-center text-gray-100 text-2xl mt-2">
          {judge} is judging!
        </h2>
      )}
    </>
  );
};

export default Question;
