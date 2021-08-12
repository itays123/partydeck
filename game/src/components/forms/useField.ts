import { useEffect, useMemo, useState } from 'react';
import { Field, NullableErrorMessage } from './types';

export function useField(
  validator: (value: string) => NullableErrorMessage,
  initialValue: string = ''
): Field {
  const [value, setter] = useState(initialValue);
  const [errorsVisible, setErrorsVisible] = useState(false);
  const error = useMemo(() => validator(value), [value, validator]);

  useEffect(() => {
    setErrorsVisible(false);
  }, [value]);

  return {
    value,
    setter,
    error,
    errorsVisible,
    showErrors() {
      setErrorsVisible(true);
    },
  };
}
