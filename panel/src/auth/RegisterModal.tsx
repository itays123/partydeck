import { createModal } from '../components/Modal/modalFactory';
import { ModalWrapper } from '../components/Modal/ModalWrapper';
import Spinner from '../components/Spinner/Spinner';
import { AuthContext } from './AuthContext';
import { CheckEmailButton, SubmitButton } from './AuthForm/Actions';
import AuthFormProvider from './AuthForm/AuthFormProvider';
import {
  EmailInputField,
  NameInputField,
  PasswordConfirmInputField,
  PasswordInputField,
} from './AuthForm/Inputs';
import {
  NameAndEmailStage,
  PasswordStage,
  Validating,
  ValidatingEmail,
} from './AuthForm/Wrappers';
import { useRegister } from './useRegister';

const ModalProvider = createModal(AuthContext, 'registerModal', 'Get Started');

export const RegisterModalOpener = ModalProvider.Opener;

export default function RegisterModal() {
  const register = useRegister();
  return (
    <ModalProvider.Visible>
      <AuthFormProvider emailShouldBeUnique onSubmit={register}>
        <ModalWrapper>
          <div className="flex flex-col items-center">
            <ModalProvider.Closer
              width={32}
              height={32}
              className="self-end p-2 -m-8"
            />
            <h1 className="mb-8">Get Started</h1>
            <div className="space-y-4">
              <NameAndEmailStage>
                <NameInputField className="auth-input" />
                <EmailInputField className="auth-input" />
                <ValidatingEmail>
                  <Spinner label="validating your email..." />
                </ValidatingEmail>
                <CheckEmailButton className="accent-button text-center w-52 text-white" />
              </NameAndEmailStage>
              <PasswordStage>
                <PasswordConfirmInputField className="auth-input" />
                <PasswordInputField
                  className="auth-input"
                  overrideLabel="Confirm Password"
                />
                <Validating>
                  <Spinner label="creating your account..." />
                </Validating>
                <SubmitButton className="accent-button text-center w-52 text-white" />
              </PasswordStage>
            </div>
          </div>
        </ModalWrapper>
      </AuthFormProvider>
    </ModalProvider.Visible>
  );
}
