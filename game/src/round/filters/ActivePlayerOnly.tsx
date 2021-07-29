import { useCurrentRound } from '../../game/GameContext';
import { RoundLifecycle } from '../../game/types';
import Conditional from '../../shared/Conditional';
import { Wrapper } from '../../shared/types';

const ActivePlayerOnly = ({ children }: Wrapper) => {
  const { status } = useCurrentRound();
  return (
    <Conditional
      condition={
        status === RoundLifecycle.USE || status === RoundLifecycle.PICK
      }
    >
      {children}
    </Conditional>
  );
};

export default ActivePlayerOnly;
