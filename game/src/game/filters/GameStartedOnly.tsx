import Conditional from '../../shared/Conditional';
import { ConditionalProps } from '../../shared/types';
import { useGameContext } from '../GameContext';
import { GameLifecycle } from '../types';

const GameStartedOnly = ({ children, fallback }: ConditionalProps) => {
  const { gameStatus } = useGameContext();
  return (
    <Conditional
      condition={gameStatus !== GameLifecycle.CREATED}
      fallback={fallback}
    >
      {children}
    </Conditional>
  );
};

export default GameStartedOnly;
