import Conditional from '../../shared/Conditional';
import { ConditionalProps } from '../../shared/types';
import { useGameContext } from '../GameContext';

const ConnectionCreatedOnly = ({ children, fallback }: ConditionalProps) => {
  const { gameCode } = useGameContext();
  return (
    <Conditional condition={gameCode} fallback={fallback}>
      {children}
    </Conditional>
  );
};

export default ConnectionCreatedOnly;
