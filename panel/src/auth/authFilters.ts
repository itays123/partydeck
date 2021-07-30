import { createWrapper } from '../shared/Filters/ConditionalWrapper';
import { AuthContext } from './AuthContext';

export const Authenticated = createWrapper(AuthContext, ctx => ctx.isSignedIn);
export const NotAuthenticated = createWrapper(
  AuthContext,
  ctx => !ctx.isSignedIn && !ctx.isLoading
);
