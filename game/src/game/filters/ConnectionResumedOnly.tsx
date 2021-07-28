import Conditional from '../../shared/Conditional';
import { Wrapper } from '../../shared/types';
import { useGameContext } from '../GameContext';

export function ConnectionResumedOnly({
  children,
  fallback,
}: Wrapper & { fallback: JSX.Element }) {
  const { playerId, isConnectionResumed } = useGameContext();
  return (
    <Conditional
      condition={
        isConnectionResumed ||
        !playerId /* connection resumed, or not yet established */
      }
      fallback={fallback}
    >
      {children}
    </Conditional>
  );
}
