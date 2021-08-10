import { useMemo } from 'react';
import Card from '../../components/Card/Card';
import { QuestionJudgeDisplay } from '../../components/QuestionJudgeDisplay/QuestionJudgeDisplay';
import { Colors, useBackground } from '../../components/theme/useBackground';
import { useCurrentRound } from '../../game/GameContext';
import { AdminOnly } from '../../game/gameContextFilters';
import { EndGameButton, NextRoundButton } from '../RoundActionButtons';
import { useIsWinner } from '../useIsWinner';

export default function RoundEndedLayout() {
  const { pickedCardId, pick, playerWon } = useCurrentRound();
  const isWinner = useIsWinner();
  useBackground(isWinner ? Colors.GREEN : Colors.PINK);

  const winningCard = useMemo(
    () => pick.find(({ id }) => id === pickedCardId),
    [pickedCardId, pick]
  );

  return (
    <>
      <h1
        className={
          (isWinner ? 'text-4xl' : 'text-3xl') +
          ' text-white font-medium md:text-6xl'
        }
      >
        {isWinner ? "It's a win!" : 'We have a winner!'}
      </h1>
      <QuestionJudgeDisplay hideJudge />
      <div className="mt-8">
        <Card>
          <div className="h-full w-full flex flex-col justify-between items-center text-theme-800 font-medium pt-8 pb-4">
            <p>{winningCard?.content}</p>
            <p className="font-bold text-xl">{playerWon}</p>
          </div>
        </Card>
      </div>
      <AdminOnly>
        <NextRoundButton className="hovering-button" />
        <EndGameButton className="hovering-button bottom-24" />
      </AdminOnly>
    </>
  );
}
