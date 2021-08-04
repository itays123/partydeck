import { useEffect, useRef } from 'react';

export function useFocusOnRender(focusOnRender?: boolean) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current && focusOnRender) ref.current.focus();
  }, [focusOnRender]);

  return ref;
}
