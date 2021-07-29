import { useCurrentRound } from '../game/GameContext';
import Waiting from './Waiting';

const WaitingForJudge = () => {
  const { judge } = useCurrentRound();
  return <Waiting text={`Waiting for ${judge}...`} />;
};

export default WaitingForJudge;
