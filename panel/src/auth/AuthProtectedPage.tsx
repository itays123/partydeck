import { Redirect } from 'react-router-dom';
import { Wrapper } from '../components/types';
import { Authenticated, NotAuthenticated } from './authFilters';

export function AuthProtectedPage({
  redirect = '/',
  children,
}: { redirect?: string } & Wrapper) {
  return (
    <>
      <Authenticated>{children}</Authenticated>
      <NotAuthenticated>
        <Redirect to={redirect} />
      </NotAuthenticated>
    </>
  );
}
