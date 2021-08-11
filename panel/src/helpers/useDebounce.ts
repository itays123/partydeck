import { useEffect } from 'react';

function useDebounce(callback: Function, delay?: number) {
  useEffect(() => {
    const timer = setTimeout(() => callback, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [callback, delay]);
}

export default useDebounce;
