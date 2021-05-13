import Conditional from '../../shared/Conditional';
import { useGameContext } from '../GameContext';

const GameStartedOnly = ({ children, fallback }) => {
  const { isStarted } = useGameContext();
  return (
    <Conditional condition={isStarted} fallback={fallback}>
      {children}
    </Conditional>
  );
};

export default GameStartedOnly;
