import Conditional from '../../shared/Conditional';
import { useGameContext } from '../GameContext';

const ActiveRoundOnly = ({ children, fallback }) => {
  const { showEndScreen } = useGameContext();
  return (
    <Conditional condition={!showEndScreen} fallback={fallback}>
      {children}
    </Conditional>
  );
};

export default ActiveRoundOnly;
