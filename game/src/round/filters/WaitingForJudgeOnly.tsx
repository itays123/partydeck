import { useCurrentRound } from '../../game/GameContext';
import { RoundLifecycle } from '../../game/types';
import Conditional from '../../shared/Conditional';
import { Wrapper } from '../../shared/types';

const WaitingForJudgeOnly = ({ children }: Wrapper) => {
  const { status } = useCurrentRound();
  return (
    <Conditional condition={status === RoundLifecycle.PENDING_JUDGE_PICK}>
      {children}
    </Conditional>
  );
};

export default WaitingForJudgeOnly;
