import { useCallback, useEffect } from 'react';
import { ValidatorState } from './types';

export function useValueValidatedCallback<T>(
  onValueValidated: (value: string, ctx: T) => void,
  value: string,
  validState: ValidatorState,
  ctx: T
) {
  const callback = useCallback(() => {
    if (validState === ValidatorState.VALIDATED) onValueValidated(value, ctx);
  }, [value, ctx, validState, onValueValidated]);

  useEffect(callback, [callback]);
}
