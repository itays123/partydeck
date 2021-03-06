import { Link } from 'react-router-dom';
import FormInput, { classicValidate, useModel } from '../../shared/FormInput';
import Spinner from '../../shared/Spinner';
import CookieConfirm from '../CookieConfirm';
import { useCheckEmail } from '../useCheckEmail';
import AuthDecoration from '../AuthDecoration';
import { useRegister } from './useRegister';

const Register = () => {
  const name = useModel('', classicValidate);
  const {
    validateEmail,
    checkEmail,
    awaitingConfirmation,
    clearErrors,
  } = useCheckEmail();
  const email = useModel('', validateEmail);
  const passwordConfirm = useModel('', classicValidate);
  const password = useModel('', value => {
    if (value.trim() === '') return 'Password must not be empty';
    else if (value !== passwordConfirm.value) return 'Passwords must match';
    else return undefined;
  });
  const showPasswordInput =
    awaitingConfirmation === false && email.validatedValue;
  const { register } = useRegister();
  return (
    <div className="register container mx-auto text-center flex justify-center">
      <div className="md:flex-shrink flex justify-center">
        <div>
          <h1 className="text-2xl mt-6 mb-2">Get Started</h1>
          <FormInput
            model={name}
            hint="Your Name"
            focusOnRender
            className="mx-auto"
          />
          <FormInput
            model={email}
            hint="Your Email"
            className="mx-auto"
            changeCallback={() => clearErrors()}
            onKeyEnter={value => {
              checkEmail(value, () => {
                email.setShowError(true);
              });
            }}
          />
          {showPasswordInput && (
            <>
              <FormInput
                model={password}
                type="password"
                hint="Your Password"
                className="mx-auto"
                focusOnRender
              />
              <FormInput
                model={passwordConfirm}
                type="password"
                hint="Confirm Password"
                className="mx-auto"
                changeCallback={() => password.setShowError(false)}
                onKeyEnter={() => {
                  if (!password.error)
                    register(
                      name.validatedValue,
                      email.validatedValue,
                      password.validatedValue
                    );
                  else password.setShowError(true);
                }}
              />
            </>
          )}
          <div className="mx-auto w-52">
            <button
              className="w-52 w-52 colorful-button bg-green-400 disabled:opacity-70 animation-scaleup flex justify-center"
              disabled={Boolean(
                showPasswordInput ? password.error : email.error
              )}
              onClick={() => {
                if (
                  !awaitingConfirmation &&
                  name.validatedValue &&
                  email.validatedValue &&
                  password.validatedValue
                ) {
                  register(
                    name.validatedValue,
                    email.validatedValue,
                    password.validatedValue
                  );
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
              GO
            </button>
            {showPasswordInput && <CookieConfirm />}
            <div className="my-2 w-52 mx-auto">
              <span className="text-gray-600 text-sm text-left">
                Already have an account? {` `}
                <Link to="/login" className="underline">
                  Log In
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <AuthDecoration />
    </div>
  );
};

export default Register;
