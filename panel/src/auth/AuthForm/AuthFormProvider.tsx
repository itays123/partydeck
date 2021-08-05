import { useCallback } from 'react';
import { createContext, useState } from 'react';
import { Wrapper } from '../../components/types';
import { Field } from '../../shared/forms/types';
import { useField } from '../../shared/forms/useField';
import { useCheckEmail } from './useCheckEmail';

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

type AuthCredentials = { email: string; password: string; name: string };
type ProviderProps = Wrapper & {
  onSubmit: (creds: AuthCredentials) => void;
  emailShouldBeUnique?: boolean;
};

const classicValidate = (errorMessage: string) => (value: string) =>
  value.trim().length === 0 ? errorMessage : null;

export default function AuthFormProvider({
  children,
  onSubmit,
  emailShouldBeUnique = false,
}: ProviderProps) {
  const { validateEmail, checkEmail } = useCheckEmail(emailShouldBeUnique);
  const email = useField(validateEmail);
  const passwordConfirm = useField(classicValidate('Invalid Password'));
  const passwordsMatchValidator = useCallback(
    (value: string) =>
      !!passwordConfirm.error || passwordConfirm.value === value // confirm field not in use, or equals to password
        ? null
        : "Passwords don't match",
    [passwordConfirm]
  );
  const password = useField(passwordsMatchValidator);
  const name = useField(classicValidate('Invalid Name'));
  const [stage, setStage] = useState(AuthFormStage.TYPING_NAME_EMAIL);

  const checkEmailCallback = useCallback(() => {
    checkEmail(email.value).then(isValid =>
      setStage(
        isValid
          ? AuthFormStage.TYPING_PASSWORD
          : AuthFormStage.TYPING_NAME_EMAIL
      )
    );
  }, [email, checkEmail]);
  const submitCallback = useCallback(() => {
    setStage(AuthFormStage.VALIDATING);
    onSubmit({
      name: name.value,
      email: email.value,
      password: password.value,
    });
  }, [name, email, password, onSubmit]);

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
