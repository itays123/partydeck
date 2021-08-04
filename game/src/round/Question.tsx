import { useCurrentRound } from '../game/GameContext';
import { UsingOnly } from '../game/gameContextFilters';

const Question = () => {
  const { question, judge } = useCurrentRound();
  return (
    <>
      <h1 className="text-center text-gray-100 text-3xl mt-4">{question}</h1>
      <UsingOnly>
        <h2 className="text-center text-gray-100 text-2xl mt-2">
          {judge} is judging!
        </h2>
      </UsingOnly>
    </>
  );
};

export default Question;
