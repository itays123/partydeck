import { useMemo } from 'react';
import { useFetch } from '../../shared/helpers/useFetch';

const re =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function useCheckEmail(emailShouldBeUnique: boolean = false) {
  const { doFetch, status, isLoading } = useFetch(
    '/auth/check',
    'GET',
    false,
    false
  );
  const emailInUse = useMemo(() => status === 409, [status]);

  return {
    async checkEmail(email: string) {
      const { status } = await doFetch(
        null,
        `?email=${email.toLowerCase()}`
      ).then();
      return emailShouldBeUnique === (status === 200);
    },
    emailInUse,
    isLoading,
    validateEmail(email: string) {
      if (!re.test(email.toLowerCase())) return 'Invalid Email';
      else if (emailInUse && emailShouldBeUnique) return 'Email already in use';
      else if (!emailInUse && !emailShouldBeUnique)
        return 'No user with this email';
      else return null;
    },
  };
}
