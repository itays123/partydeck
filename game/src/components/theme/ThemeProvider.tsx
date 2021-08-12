import { motion } from 'framer-motion';
import { useContext } from 'react';
import { createContext } from 'react';
import { Wrapper } from '../types';
import { keyframes, useColorKeyframes } from './useColorKeyframes';

interface IThemeProvider {
  setColor(index: number): void;
}

const ThemeContext = createContext({} as IThemeProvider);

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: Wrapper) {
  // const { backgroundColor, setColor } = useColorKeyframes();
  const { color, colorOverride, setColor } = useColorKeyframes();
  return (
    <ThemeContext.Provider value={{ setColor }}>
      <motion.div
        initial={{ backgroundColor: keyframes[0] }}
        animate={{ backgroundColor: colorOverride ? color : keyframes }}
        transition={{
          duration: colorOverride ? 1 : 10,
          ease: 'easeInOut',
          times: [0, 0.3, 0.5, 0.7, 0.9],
          loop: colorOverride ? 0 : Infinity,
          repeatDelay: 1,
        }}
        className="w-screen h-screen"
      >
        {children}
      </motion.div>
    </ThemeContext.Provider>
  );
}
