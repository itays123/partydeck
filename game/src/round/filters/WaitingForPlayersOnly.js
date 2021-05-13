import Conditional from '../../shared/Conditional';
import { useRoundContext } from '../RoundContext';

const WaitingForPlayersOnly = ({ children }) => {
  const { isWaitingForPlayers } = useRoundContext();
  return <Conditional condition={isWaitingForPlayers}>{children}</Conditional>;
};

export default WaitingForPlayersOnly;
