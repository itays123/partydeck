import { useCurrentRound } from '../../game/GameContext';
import { RoundLifecycle } from '../../game/types';
import Conditional from '../../shared/Conditional';
import { Wrapper } from '../../shared/types';

const NotSkippedOnly = ({ children }: Wrapper) => {
  const { status, playerWon } = useCurrentRound();
  return (
    <Conditional
      condition={status !== RoundLifecycle.PENDING_ADMIN_ACTION || playerWon}
    >
      {children}
    </Conditional>
  );
};

export default NotSkippedOnly;
