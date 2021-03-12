import { Redirect } from 'react-router-dom';
import { useAuthContext } from './AuthContext';

const AuthOnly = ({ shouldNotBeAuthenticated = false, redirect, children }) => {
  const { isSignedIn, isLoading } = useAuthContext();
  if (isLoading) return null;
  else if (isSignedIn !== shouldNotBeAuthenticated) return children;
  else if (redirect) return <Redirect to={redirect} />;
  else return null;
};

export default AuthOnly;
