import Conditional from '../../shared/Conditional';
import { Wrapper } from '../../shared/types';
import { useGameContext } from '../GameContext';
import { ConnectionLifecycle, GameLifecycle } from '../types';

const UnexpectedDisconnectionOnly = ({ children }: Wrapper) => {
  const { connectionStatus, gameStatus } = useGameContext();
  return (
    <Conditional
      condition={
        connectionStatus === ConnectionLifecycle.DESTROYED &&
        gameStatus !== GameLifecycle.STOPPED
      }
    >
      {children}
    </Conditional>
  );
};

export default UnexpectedDisconnectionOnly;
