import { Link } from 'react-router-dom';
import FormInput, { useModel } from '../../shared/FormInput';
import Spinner from '../../shared/Spinner';
import CookieConfirm from '../CookieConfirm';
import { useCheckEmail } from '../useCheckEmail';
import AuthDecoration from '../AuthDecoration';
import useLogin from './useLogin';

const Login = () => {
  const { login, isLoginLoading, loginFailed, clearError } = useLogin();
  const {
    validateEmail,
    checkEmail,
    awaitingConfirmation,
    clearErrors,
  } = useCheckEmail(true);
  const email = useModel('', validateEmail);
  const password = useModel('', value => {
    if (value.trim() === '') return 'Password must not be empty';
    else if (loginFailed) return 'Incorrect password';
    else return undefined;
  });
  const showPasswordInput =
    awaitingConfirmation === false && email.validatedValue;
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0">
      <div className="login container mx-auto text-center py-2 flex justify-center items-stretch h-full">
        <div className="md:flex-shrink flex justify-center">
          <div>
            <h1 className="text-2xl mt-6 mb-2">Log in to Partydeck</h1>
            <FormInput
              model={email}
              hint="Your Email"
              className="mx-auto"
              focusOnRender
              changeCallback={() => clearErrors()}
              onKeyEnter={value => {
                checkEmail(value, () => {
                  email.setShowError(true);
                });
              }}
            />
            {showPasswordInput && (
              <FormInput
                model={password}
                type="password"
                hint="Your Password"
                className="mx-auto"
                focusOnRender
                changeCallback={() => clearError()}
                onKeyEnter={() => {
                  if (!password.error)
                    login(email.validatedValue, password.validatedValue);
                  else password.setShowError(true);
                }}
              />
            )}
            <div className="mx-auto w-52">
              <button
                className="w-52 colorful-button bg-green-400 disabled:opacity-70 animation-scaleup flex justify-center"
                disabled={Boolean(
                  showPasswordInput ? password.error : email.error
                )}
                onClick={() => {
                  if (
                    !awaitingConfirmation &&
                    email.validatedValue &&
                    password.validatedValue
                  ) {
                    login(email.validatedValue, password.validatedValue);
                  } else {
                    checkEmail(email.value, result => {
                      email.setShowError(true);
                    });
                  }
                }}
              >
                {awaitingConfirmation === true && email.validatedValue && (
                  <Spinner />
                )}
                {isLoginLoading && <Spinner />}
                GO
              </button>
              {showPasswordInput && <CookieConfirm />}
              <div className="my-2 w-52 mx-auto">
                <span className="text-gray-600 text-sm text-left">
                  Don't have an account? {` `}
                  <Link to="/start" className="underline">
                    Sign Up
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
        <AuthDecoration />
      </div>
    </div>
  );
};

export default Login;
