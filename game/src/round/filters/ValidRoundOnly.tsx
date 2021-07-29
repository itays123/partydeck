import Conditional from '../../shared/Conditional';
import { ConditionalProps } from '../../shared/types';
import { useCurrentRound } from '../../game/GameContext';
import { RoundLifecycle } from '../../game/types';

export default function ValidRoundOnly({
  children,
  fallback,
}: ConditionalProps) {
  // when a player joins in the middle of a game, display the fallback until next round
  const { status } = useCurrentRound();
  return (
    <Conditional
      condition={status !== RoundLifecycle.WAITING_FOR_DATA}
      fallback={fallback}
    >
      {children}
    </Conditional>
  );
}
