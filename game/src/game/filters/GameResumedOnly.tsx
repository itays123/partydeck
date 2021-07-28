import Conditional from '../../shared/Conditional';
import { ConditionalProps } from '../../shared/types';
import { useGameContext } from '../GameContext';
import { GameLifecycle } from '../types';

export default function GameResumedOnly({
  children,
  fallback,
}: ConditionalProps) {
  const { gameStatus } = useGameContext();
  return (
    <Conditional
      condition={gameStatus === GameLifecycle.RESUMED}
      fallback={fallback}
    >
      {children}
    </Conditional>
  );
}
