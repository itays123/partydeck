import { useState, useCallback, useEffect } from 'react';
import useDebounce from '../helpers/useDebounce';
import { Validator, ValidatorState } from './types';

export function useValidator<T>(
  validator: Validator<T>,
  value: string,
  ctx: T
) {
  const [validState, setValidState] = useState(ValidatorState.INITIAL);
  const [error, setError] = useState<string>();

  const validationHandler = useCallback(() => {
    if (validState !== ValidatorState.INITIAL) return;
    const nullableErrorMessage = validator(value, ctx);
    if (!nullableErrorMessage) {
      setValidState(ValidatorState.VALIDATED);
    } else if (typeof nullableErrorMessage === 'string') {
      setValidState(ValidatorState.INVALID);
      setError(nullableErrorMessage);
    } else {
      // validator returned a promise
      setValidState(ValidatorState.VALIDATING);
      nullableErrorMessage.then(message => {
        if (!message) setValidState(ValidatorState.VALIDATED);
        else {
          setValidState(ValidatorState.INVALID);
          setError(message);
        }
      });
    }
  }, [validator, validState, value, ctx]);

  const clear = useCallback(() => {
    setValidState(ValidatorState.INITIAL);
    setError(undefined);
  }, []);

  useEffect(clear, [value, clear]);

  return {
    validate: validationHandler,
    validState,
    error,
    clear,
  };
}
