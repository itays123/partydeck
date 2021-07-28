import Conditional from '../../shared/Conditional';
import { Wrapper } from '../../shared/types';
import { useGameContext } from '../GameContext';

const UnexpectedDisconnectionOnly = ({ children }: Wrapper) => {
  const { isConnected, showEndScreen } = useGameContext();
  return (
    <Conditional condition={!isConnected && !showEndScreen}>
      {children}
    </Conditional>
  );
};

export default UnexpectedDisconnectionOnly;
