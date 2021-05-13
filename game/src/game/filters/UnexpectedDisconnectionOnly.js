import Conditional from '../../shared/Conditional';
import { useGameContext } from '../GameContext';

const UnexpectedDisconnectionOnly = ({ children }) => {
  const { isConnected, showEndScreen } = useGameContext();
  return (
    <Conditional condition={!isConnected && !showEndScreen}>
      {children}
    </Conditional>
  );
};

export default UnexpectedDisconnectionOnly;
