import PageTitle from '../components/PageTitle/PageTitle';
import { Colors, useBackground } from '../components/theme/useBackground';
import { BrandedConfetti } from './confetti/BrandedConfetti';
import Top3Players from './scoreboard/Top3Players';
import { PlayerLost, PlayerWon, usePlayerWon } from './usePlayerWon';

export default function GameOver() {
  const playerWon = usePlayerWon();
  useBackground(playerWon ? Colors.GREEN : Colors.PINK);

  return (
    <div className="flex flex-col h-full w-full items-center space-y-8 pt-8">
      <BrandedConfetti />
      <PageTitle>
        <PlayerWon>Victory!</PlayerWon>
        <PlayerLost>Game Over</PlayerLost>
      </PageTitle>
      <Top3Players />
      <h2 className="text-white text-2xl text-center">
        <PlayerWon>Well Done!</PlayerWon>
        <PlayerLost>Greet The Winners</PlayerLost>
      </h2>
    </div>
  );
}
