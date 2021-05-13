import Conditional from '../../shared/Conditional';
import { useRoundContext } from '../RoundContext';

const ActivePlayerOnly = ({ children }) => {
  const { isActive } = useRoundContext();
  return <Conditional condition={isActive}>{children}</Conditional>;
};

export default ActivePlayerOnly;
