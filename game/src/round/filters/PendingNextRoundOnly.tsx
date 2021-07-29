import { useCurrentRound } from '../../game/GameContext';
import { RoundLifecycle } from '../../game/types';
import Conditional from '../../shared/Conditional';
import { Wrapper } from '../../shared/types';

const PendingNextRoundOnly = ({ children }: Wrapper) => {
  const { status } = useCurrentRound();
  return (
    <Conditional condition={status === RoundLifecycle.PENDING_ADMIN_ACTION}>
      {children}
    </Conditional>
  );
};

export default PendingNextRoundOnly;
