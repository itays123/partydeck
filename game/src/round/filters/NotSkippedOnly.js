import { useGameContext } from '../../game/GameContext';
import Conditional from '../../shared/Conditional';

const NotSkippedOnly = ({ children }) => {
  const { skipped } = useGameContext();
  return <Conditional condition={!skipped}>{children}</Conditional>;
};

export default NotSkippedOnly;
