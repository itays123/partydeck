import { useMemo, useState } from 'react';
import { Field, NullableErrorMessage } from './types';

export function useField(
  validator: (value: string) => NullableErrorMessage,
  initialValue: string = ''
): Field {
  const [value, setter] = useState(initialValue);
  const error = useMemo(() => validator(value), [value, validator]);
  return { value, setter, error };
}
