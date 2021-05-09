import Conditional from '../../shared/Conditional';
import { useGameContext } from '../GameContext';

const ConnectedOnly = ({ children, fallback }) => {
  const { gameCode } = useGameContext();
  return (
    <Conditional condition={gameCode} fallback={fallback}>
      {children}
    </Conditional>
  );
};

export default ConnectedOnly;
