import { useGameContext } from '../game/GameContext';
import { questions } from '../game/testCards';

const Question = () => {
  const { question } = useGameContext();
  return (
    <h1 className="text-center text-gray-100 text-3xl mt-4">{question}</h1>
  );
};

export default Question;
