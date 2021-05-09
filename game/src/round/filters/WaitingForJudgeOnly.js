import Conditional from '../../shared/Conditional';
import { useRoundContext } from '../RoundContext';

const WaitingForJudgeOnly = ({ children }) => {
  const { isWaitingForJudge } = useRoundContext();
  return <Conditional condition={isWaitingForJudge}>{children}</Conditional>;
};

export default WaitingForJudgeOnly;
