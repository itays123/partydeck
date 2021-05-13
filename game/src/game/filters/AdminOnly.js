import Conditional from '../../shared/Conditional';
import { useGameContext } from '../GameContext';

const AdminOnly = ({ children, inverted = false, fallback = null }) => {
  const { isAdmin } = useGameContext();
  return (
    <Conditional condition={isAdmin} inverted={inverted} fallback={fallback}>
      {children}
    </Conditional>
  );
};

export default AdminOnly;
