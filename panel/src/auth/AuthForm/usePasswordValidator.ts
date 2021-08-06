import { useCallback } from 'react';
import { Field } from '../../shared/forms/types';

export function usePasswordValidator(
  authError: boolean,
  passwordConfirm: Field
) {
  return useCallback(
    (value: string) =>
      authError
        ? 'Incorrect Password'
        : !!passwordConfirm.error || passwordConfirm.value === value // confirm field not in use, or equals to password
        ? null
        : "Passwords don't match",
    [passwordConfirm, authError]
  );
}
