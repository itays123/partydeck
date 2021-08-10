import { useCurrentRound } from '../../game/GameContext';

export function QuestionJudgeDisplay() {
  const { question, judge } = useCurrentRound();
  return (
    <div className="text-white text-center space-y-2">
      <h1 className="text-2xl md:text-4xl font-medium">{question}</h1>
      <p className="text-lg md:text-xl">
        <span className="font-bold">{judge}</span> is judging!
      </p>
    </div>
  );
}
