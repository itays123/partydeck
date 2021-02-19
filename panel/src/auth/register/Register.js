import FormInput, { classicValidate, useModel } from '../../shared/FormInput';
import Spinner from '../../shared/Spinner';
import { useCheckEmail } from '../useCheckEmail';
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
    if (value !== passwordConfirm.value) return 'Password must match';
    else return undefined;
  });
  const showPasswordInput =
    awaitingConfirmation === false && email.validatedValue;
  const { register } = useRegister();
  return (
    <div className="register container mx-auto text-center">
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
        focusOnRender
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
                register(email.validatedValue, password.validatedValue);
              else password.setShowError(true);
            }}
          />
        </>
      )}
      <div className="mx-auto w-52">
        <button
          className="w-52 dark-button flex justify-center"
          disabled={Boolean(showPasswordInput ? password.error : email.error)}
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
          {awaitingConfirmation === true && email.validatedValue && <Spinner />}
          GO
        </button>
      </div>
    </div>
  );
};

export default Register;
