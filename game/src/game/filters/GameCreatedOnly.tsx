import Conditional from '../../shared/Conditional';
import { ConditionalProps } from '../../shared/types';
import { useGameContext } from '../GameContext';
import { GameLifecycle } from '../types';

const ActiveRoundOnly = ({ children, fallback }: ConditionalProps) => {
  const { gameStatus } = useGameContext();
  return (
    <Conditional
      condition={
        gameStatus !== GameLifecycle.STOPPED &&
        gameStatus !== GameLifecycle.PRE_CREATED
      }
      fallback={fallback}
    >
      {children}
    </Conditional>
  );
};

export default ActiveRoundOnly;
