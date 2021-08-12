import { useEffect } from 'react';
import { useTheme } from './ThemeProvider';

export enum Colors {
  THEME = 0,
  PINK = 1,
  ORANGE = 2,
  GREEN = 3,
}

export function useBackground(color: Colors) {
  const { setColor } = useTheme();

  useEffect(() => {
    setColor(color);
  }, [color, setColor]);
}
