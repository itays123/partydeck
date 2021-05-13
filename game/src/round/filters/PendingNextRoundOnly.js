import Conditional from '../../shared/Conditional';
import { useRoundContext } from '../RoundContext';

const PendingNextRoundOnly = ({ children }) => {
  const { isWaitingForRound } = useRoundContext();
  return <Conditional condition={isWaitingForRound}>{children}</Conditional>;
};

export default PendingNextRoundOnly;
