import { createModal } from '../components/Modal/modalFactory';
import { ModalWrapper } from '../components/Modal/ModalWrapper';
import Spinner from '../components/Spinner/Spinner';
import { AuthContext } from './AuthContext';
import { CheckEmailButton, SubmitButton } from './AuthForm/Actions';
import AuthFormProvider from './AuthForm/AuthFormProvider';
import { EmailInputField, PasswordInputField } from './AuthForm/Inputs';
import PrivacyStatement from './AuthForm/PrivacyStatement';
import {
  NameAndEmailStage,
  PasswordStage,
  Validating,
  ValidatingEmail,
} from './AuthForm/Wrappers';
import { useLogin } from './actions/useLogin';

const ModalProvider = createModal(AuthContext, 'loginModal', 'Log In');

export const LoginModalOpener = ModalProvider.Opener;

export default function LoginModal() {
  const login = useLogin();
  return (
    <ModalProvider.Visible>
      <AuthFormProvider onSubmit={login}>
        <ModalWrapper>
          <div className="flex flex-col items-center">
            <ModalProvider.Closer
              width={32}
              height={32}
              className="self-end p-2 -m-8"
            />
            <h1 className="mb-8">Log In</h1>
            <div className="space-y-4">
              <NameAndEmailStage>
                <EmailInputField className="auth-input" />
                <ValidatingEmail>
                  <Spinner label="validating your email..." />
                </ValidatingEmail>
                <CheckEmailButton className="accent-button text-center w-52 text-white" />
              </NameAndEmailStage>
              <PasswordStage>
                <PasswordInputField className="auth-input" />
                <Validating>
                  <Spinner label="logging you in..." />
                </Validating>
                <PrivacyStatement />
                <SubmitButton className="accent-button text-center w-52 text-white" />
              </PasswordStage>
            </div>
          </div>
        </ModalWrapper>
      </AuthFormProvider>
    </ModalProvider.Visible>
  );
}
