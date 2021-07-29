import { useCurrentRound } from '../../game/GameContext';
import { RoundLifecycle } from '../../game/types';
import Conditional from '../../shared/Conditional';
import { Wrapper } from '../../shared/types';

const UsingOnly = ({ children }: Wrapper) => {
  const { status } = useCurrentRound();
  return (
    <Conditional condition={status === RoundLifecycle.USE}>
      {children}
    </Conditional>
  );
};

export default UsingOnly;
