import Conditional from '../../shared/Conditional';
import { Wrapper } from '../../shared/types';
import { useGameContext } from '../GameContext';
import { ConnectionLifecycle } from '../types';

export function ConnectionResumedOnly({
  children,
  fallback,
}: Wrapper & { fallback: JSX.Element }) {
  const { connectionStatus } = useGameContext();
  return (
    <Conditional
      condition={connectionStatus === ConnectionLifecycle.RESUMED}
      fallback={fallback}
    >
      {children}
    </Conditional>
  );
}
