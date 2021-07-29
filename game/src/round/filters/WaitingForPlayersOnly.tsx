import { useCurrentRound } from '../../game/GameContext';
import { RoundLifecycle } from '../../game/types';
import Conditional from '../../shared/Conditional';
import { Wrapper } from '../../shared/types';

const WaitingForPlayersOnly = ({ children }: Wrapper) => {
  const { status } = useCurrentRound();
  return (
    <Conditional condition={status === RoundLifecycle.PENDING_PLAYER_USAGES}>
      {children}
    </Conditional>
  );
};

export default WaitingForPlayersOnly;
