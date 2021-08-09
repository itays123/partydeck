import PlayerIterator from '../components/PlayerIterator/PlayerIterator';
import { useCurrentRound } from '../game/GameContext';

export function PlayerAnswerFeeback() {
  const { playersUsed } = useCurrentRound();
  return (
    <div className="player-list-wrapper flex-grow mb-20">
      <PlayerIterator iterate={playerId => playersUsed.has(playerId)} />
    </div>
  );
}
