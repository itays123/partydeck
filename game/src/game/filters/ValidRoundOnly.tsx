import Conditional from '../../shared/Conditional';
import { ConditionalProps } from '../../shared/types';
import { useGameContext } from '../GameContext';

export default function ValidRoundOnly({
  children,
  fallback,
}: ConditionalProps) {
  // when a player joins in the middle of a game, display the fallback until next round
  const { isWaitingForNextRound } = useGameContext();
  return (
    <Conditional condition={!isWaitingForNextRound} fallback={fallback}>
      {children}
    </Conditional>
  );
}
