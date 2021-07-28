import Conditional from '../../shared/Conditional';
import { Wrapper } from '../../shared/types';
import { useGameContext } from '../GameContext';
import { ConnectionLifecycle } from '../types';

const UnexpectedDisconnectionOnly = ({ children }: Wrapper) => {
  const { connectionStatus, showEndScreen } = useGameContext();
  return (
    <Conditional
      condition={
        connectionStatus === ConnectionLifecycle.DESTROYED && !showEndScreen
      }
    >
      {children}
    </Conditional>
  );
};

export default UnexpectedDisconnectionOnly;
