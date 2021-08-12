import { useEffect, useState } from 'react';
import { useGameEditorContext } from '../GameEditorContext';

// returns true if the game is changed for more than 1.5 seconds straight
export function useHardIsChanged() {
  const { isChanged } = useGameEditorContext();
  const [hardIsChanged, setHardIsChanged] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isChanged) {
      timer = setTimeout(() => setHardIsChanged(true), 1500);
    } else {
      setHardIsChanged(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isChanged]);

  return hardIsChanged;
}
