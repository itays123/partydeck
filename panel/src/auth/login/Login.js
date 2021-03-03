import FormInput, { classicValidate, useModel } from '../../shared/FormInput';
import Spinner from '../../shared/Spinner';
import { useCheckEmail } from '../useCheckEmail';
import useLogin from './useLogin';

const Login = () => {
  const {
    validateEmail,
    checkEmail,
    awaitingConfirmation,
    clearErrors,
  } = useCheckEmail(true);
  const email = useModel('', validateEmail);
  const password = useModel('', classicValidate);
  const { login } = useLogin();
  const showPasswordInput =
    awaitingConfirmation === false && email.validatedValue;
  return (
    <div className="login container mx-auto text-center py-2">
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
          onKeyEnter={() => {
            if (!password.error)
              login(email.validatedValue, password.validatedValue);
            else password.setShowError(true);
          }}
        />
      )}
      <div className="mx-auto w-52">
        <button
          className="w-52 colorful-button bg-green-400 animation-scaleup flex justify-center"
          disabled={Boolean(showPasswordInput ? password.error : email.error)}
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
          {awaitingConfirmation === true && email.validatedValue && <Spinner />}
          GO
        </button>
      </div>
    </div>
  );
};

export default Login;
