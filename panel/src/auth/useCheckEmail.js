import { useState } from 'react';
import { useFetch } from '../shared/helpers/useAsyncFetch';

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function useCheckEmail(shouldEmailBeInUse = false) {
  const { doFetch } = useFetch('/auth/check', 'GET', false, false);
  const [isEmailInUse, setEmailInUse] = useState(undefined);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(1);

  return {
    checkEmail(email, callback = () => {}) {
      setAwaitingConfirmation(true);
      doFetch(null, `?email=${String(email).toLowerCase()}`).then(res => {
        const result = res.status === 409;
        setEmailInUse(result);
        setAwaitingConfirmation(false);
        callback(result);
      });
    },
    validateEmail(email) {
      if (!re.test(String(email).toLowerCase())) {
        return 'Invalid Email';
      } else if (
        isEmailInUse !== shouldEmailBeInUse &&
        isEmailInUse !== undefined
      ) {
        return shouldEmailBeInUse
          ? 'No user with this email'
          : 'Email already in use';
      } else return undefined;
    },
    clearErrors() {
      setEmailInUse(undefined);
      setAwaitingConfirmation(undefined);
    },
    awaitingConfirmation,
  };
}
