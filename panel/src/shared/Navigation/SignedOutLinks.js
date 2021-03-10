import AuthOnly from '../../auth/AuthOnly';
import NavigationButton from './NavigationButton';

const SignedOutLinks = () => {
  return (
    <AuthOnly shouldNotBeAuthenticated>
      <NavigationButton to="/login" hideOnSmallScreens>
        Login
      </NavigationButton>
      <NavigationButton to="/start">Get Started</NavigationButton>
    </AuthOnly>
  );
};

export default SignedOutLinks;
