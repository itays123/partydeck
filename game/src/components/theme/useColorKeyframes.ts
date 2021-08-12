import { useCallback, useState } from 'react';

export const keyframes = [
  '#4F46E5',
  '#EC4899',
  '#F59E0B',
  '#76E235',
  '#4F46E5',
];

export function useColorKeyframes(initialOverride: boolean = false) {
  const [color, setColorValue] = useState(keyframes[0]);
  const [colorOverride, setColorOverride] = useState(initialOverride);
  const setColor = useCallback((index: number) => {
    setColorValue(keyframes[index]);
    setColorOverride(true);
  }, []);
  return { color, colorOverride, setColor };
}
