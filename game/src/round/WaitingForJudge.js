import { useGameContext } from '../game/GameContext';
import Waiting from './Waiting';

const WaitingForJudge = () => {
  const { judge } = useGameContext();
  return <Waiting text={`Waiting for ${judge}...`} />;
};

export default WaitingForJudge;
