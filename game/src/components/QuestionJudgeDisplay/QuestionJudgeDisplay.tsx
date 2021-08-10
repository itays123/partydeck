import { useCurrentRound } from '../../game/GameContext';

export function QuestionJudgeDisplay({ hideJudge }: { hideJudge?: boolean }) {
  const { question, judge } = useCurrentRound();
  return (
    <div className="text-white text-center space-y-2">
      <h1 className="text-lg md:text-2xl font-medium w-3/4 md:w-full mx-auto mt-2">
        {question}
      </h1>
      {hideJudge || (
        <p className="text-lg md:text-xl">
          <span className="font-bold">{judge}</span> is judging!
        </p>
      )}
    </div>
  );
}
