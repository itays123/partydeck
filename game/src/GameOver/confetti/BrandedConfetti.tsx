import useWindowSize from './useWindowSize';
import Confetti from 'react-confetti';

const colors = ['#4F46E5', '#EC4899', '#F59E0B', '#76E235'];

export function BrandedConfetti({ run = true }: { run?: boolean }) {
  const [width, height] = useWindowSize();
  return <Confetti width={width} height={height} colors={colors} run={run} />;
}
