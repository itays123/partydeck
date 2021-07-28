import Conditional from '../../shared/Conditional';
import { ConditionalProps } from '../../shared/types';
import { useGameContext } from '../GameContext';
import { ConnectionLifecycle } from '../types';

const ConnectionCreatedOnly = ({ children, fallback }: ConditionalProps) => {
  const { connectionStatus } = useGameContext();
  return (
    <Conditional
      condition={connectionStatus !== ConnectionLifecycle.PRE_CREATED}
      fallback={fallback}
    >
      {children}
    </Conditional>
  );
};

export default ConnectionCreatedOnly;
