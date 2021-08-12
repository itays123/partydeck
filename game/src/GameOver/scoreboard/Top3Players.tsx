import { useMemo } from 'react';
import { useGameContext } from '../../game/GameContext';
import { ScoreboardPlayerEntry } from './ScoreboardPlayerEntry';

export default function Top3Players() {
  const { scoreboard } = useGameContext();
  const highestScore = useMemo<number>(() => scoreboard[0].score, [scoreboard]);
  return (
    <div className="flex items-end justify-center space-x-2 md:space-x-4">
      <ScoreboardPlayerEntry
        nickname={scoreboard[1].nickname}
        score={scoreboard[1].score}
        relativeScore={scoreboard[1].score / highestScore || 0.5}
      />
      <ScoreboardPlayerEntry
        nickname={scoreboard[0].nickname}
        score={scoreboard[0].score}
        relativeScore={1}
      />
      <ScoreboardPlayerEntry
        nickname={scoreboard[2].nickname}
        score={scoreboard[2].score}
        relativeScore={scoreboard[2].score / highestScore || 0.3}
      />
    </div>
  );
}
