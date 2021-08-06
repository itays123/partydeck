import { Dispatch, SetStateAction, useCallback } from 'react';
import { Field } from '../../components/forms/types';
import { AuthCredentials, AuthFormStage } from './AuthFormProvider';

type IArgs = {
  name: Field;
  email: Field;
  password: Field;
  onSubmit: (creds: AuthCredentials) => Promise<boolean>;
  setStage: Dispatch<SetStateAction<AuthFormStage>>;
  setAuthError: Dispatch<SetStateAction<boolean>>;
};

export function useAsyncPasswordValidator({
  name,
  email,
  password,
  onSubmit,
  setStage,
  setAuthError,
}: IArgs) {
  return useCallback(() => {
    setStage(AuthFormStage.VALIDATING);
    onSubmit({
      name: name.value,
      email: email.value,
      password: password.value,
    }).then(valid => {
      if (!valid) setAuthError(true);
      setStage(AuthFormStage.TYPING_PASSWORD);
      password.showErrors();
    });
  }, [name, email, password, onSubmit, setAuthError, setStage]);
}
