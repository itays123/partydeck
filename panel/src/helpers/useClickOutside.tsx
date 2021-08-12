import { useCallback, useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

export default function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: Function
) {
  const handleClickOutside = useCallback(
    (event: Event) => {
      if (ref?.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handleClickOutside]);
}
