import { createModal } from '../components/Modal/modalFactory';
import { ModalWrapper } from '../components/Modal/ModalWrapper';
import Spinner from '../shared/Spinner';
import { AuthContext } from './AuthContext';
import { CheckEmailButton, SubmitButton } from './AuthForm/Actions';
import AuthFormProvider from './AuthForm/AuthFormProvider';
import { EmailInputField, PasswordInputField } from './AuthForm/Inputs';
import {
  NameAndEmailStage,
  PasswordStage,
  Validating,
  ValidatingEmail,
} from './AuthForm/Wrappers';
import { useLogin } from './useLogin';

const ModalProvider = createModal(AuthContext, 'loginModal', 'Log In');

export const LoginModalOpener = ModalProvider.Opener;

export default function LoginModal() {
  const login = useLogin();
  return (
    <ModalProvider.Visible>
      <ModalWrapper>
        <div className="flex justify-between items-start">
          <h1>Log In</h1>
          <ModalProvider.Closer
            width={32}
            height={32}
            className="p-2 text-theme-800 -m-8"
          />
        </div>
        <AuthFormProvider onSubmit={login}>
          <NameAndEmailStage>
            <EmailInputField />
            <CheckEmailButton />
            <ValidatingEmail>
              <Spinner />
            </ValidatingEmail>
          </NameAndEmailStage>
          <PasswordStage>
            <PasswordInputField />
            <SubmitButton />
            <Validating>
              <Spinner />
            </Validating>
          </PasswordStage>
        </AuthFormProvider>
      </ModalWrapper>
    </ModalProvider.Visible>
  );
}
