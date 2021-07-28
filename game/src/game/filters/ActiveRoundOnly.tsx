import Conditional from '../../shared/Conditional';
import { ConditionalProps } from '../../shared/types';
import { useGameContext } from '../GameContext';

const ActiveRoundOnly = ({ children, fallback }: ConditionalProps) => {
  const { showEndScreen } = useGameContext();
  return (
    <Conditional condition={!showEndScreen} fallback={fallback}>
      {children}
    </Conditional>
  );
};

export default ActiveRoundOnly;
