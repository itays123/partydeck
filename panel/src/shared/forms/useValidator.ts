import { useState, useCallback, useEffect } from 'react';
import useDebounce from '../helpers/useDebounce';
import {
  AsyncValidator,
  NullableErrorMessage,
  Validator,
  ValidatorState,
} from './types';

export function useValidator<T>(
  validator: Validator<T>,
  asyncValidator: AsyncValidator<T> | undefined,
  value: string,
  ctx: T
) {
  const [validState, setValidState] = useState(ValidatorState.INITIAL);
  const [error, setError] = useState<string>();

  const validationHandler = useCallback(
    (nullableErrorMessage: NullableErrorMessage) => {
      if (nullableErrorMessage) {
        setValidState(ValidatorState.INVALID);
        setError(nullableErrorMessage);
      } else {
        setValidState(ValidatorState.VALIDATED);
      }
    },
    []
  );

  const validatorCallback = useCallback(() => {
    if (validState !== ValidatorState.INITIAL) return;
    const nullableErrorMessage = validator(value, ctx);
    validationHandler(nullableErrorMessage);
  }, [validator, validState, value, ctx, validationHandler]);

  const asyncValidatorCallback = useCallback(async () => {
    validatorCallback();
    if (!asyncValidator) {
      setValidState(ValidatorState.VALIDATED);
      return true;
    }
    if (validState !== ValidatorState.INITIAL) return false;
    setValidState(ValidatorState.VALIDATING);
    const nullableErrorMessage = await asyncValidator(value, ctx);
    validationHandler(nullableErrorMessage);
    return !nullableErrorMessage;
  }, [
    asyncValidator,
    validState,
    value,
    ctx,
    validationHandler,
    validatorCallback,
  ]);

  const clear = useCallback(() => {
    setValidState(ValidatorState.INITIAL);
    setError(undefined);
  }, []);

  useEffect(clear, [value, clear]);
  useDebounce(validatorCallback, 500);

  return {
    validateAsync: asyncValidatorCallback,
    validState,
    error,
    clear,
  };
}
