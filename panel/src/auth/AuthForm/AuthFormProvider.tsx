import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { Wrapper } from '../../components/types';
import { Field } from '../../shared/forms/types';
import { useField } from '../../shared/forms/useField';
import { useAsyncEmailValidator } from './useAsyncEmailValidator';
import { useAsyncPasswordValidator } from './useAsyncPasswordValidator';
import { useCheckEmail } from './useCheckEmail';
import { usePasswordValidator } from './usePasswordValidator';

interface IAuthFormContext {
  email: Field;
  password: Field;
  name: Field;
  passwordConfirm: Field;
  stage: AuthFormStage;
  checkEmail: () => void;
  onSubmit: () => void;
}

export enum AuthFormStage {
  TYPING_NAME_EMAIL,
  VALIDATING_EMAIL,
  TYPING_PASSWORD,
  VALIDATING,
}

export const AuthFormContext = createContext({} as IAuthFormContext);

export type AuthCredentials = { name: string; email: string; password: string };
type ProviderProps = Wrapper & {
  onSubmit: (creds: AuthCredentials) => Promise<boolean>;
  emailShouldBeUnique?: boolean;
};

const classicValidate = (errorMessage: string) => (value: string) =>
  value.trim().length === 0 ? errorMessage : null;

export default function AuthFormProvider({
  children,
  onSubmit,
  emailShouldBeUnique = false,
}: ProviderProps) {
  const [authError, setAuthError] = useState(false);
  const { validateEmail, checkEmail, allowCheck } =
    useCheckEmail(emailShouldBeUnique);
  const email = useField(validateEmail);
  const passwordConfirm = useField(classicValidate('Invalid Password'));
  const pwValidator = usePasswordValidator(authError, passwordConfirm);
  const password = useField(pwValidator);
  const name = useField(classicValidate('Invalid Name'));
  const [stage, setStage] = useState(AuthFormStage.TYPING_NAME_EMAIL);
  const checkEmailCallback = useAsyncEmailValidator(
    email,
    checkEmail,
    setStage
  );
  const submitCallback = useAsyncPasswordValidator({
    name,
    email,
    password,
    onSubmit,
    setStage,
    setAuthError,
  });

  useEffect(() => {
    allowCheck();
  }, [email.value, allowCheck]);

  return (
    <AuthFormContext.Provider
      value={{
        name,
        email,
        password,
        passwordConfirm,
        stage,
        checkEmail: checkEmailCallback,
        onSubmit: submitCallback,
      }}
    >
      {children}
    </AuthFormContext.Provider>
  );
}
