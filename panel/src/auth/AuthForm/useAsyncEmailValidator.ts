import { Dispatch, SetStateAction, useCallback } from 'react';
import { Field } from '../../shared/forms/types';
import { AuthFormStage } from './AuthFormProvider';

export function useAsyncEmailValidator(
  email: Field,
  checkEmail: (value: string) => Promise<boolean>,
  setStage: Dispatch<SetStateAction<AuthFormStage>>
) {
  return useCallback(() => {
    setStage(AuthFormStage.VALIDATING_EMAIL);
    checkEmail(email.value).then(isValid => {
      setStage(
        isValid
          ? AuthFormStage.TYPING_PASSWORD
          : AuthFormStage.TYPING_NAME_EMAIL
      );
      if (!isValid) email.showErrors();
    });
  }, [email, checkEmail, setStage]);
}
