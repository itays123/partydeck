import { useGameContext } from '../game/GameContext';

const Question = () => {
  const { question } = useGameContext();
  return (
    <h1 className="text-center text-gray-100 text-3xl mt-4">{question}</h1>
  );
};

export default Question;
