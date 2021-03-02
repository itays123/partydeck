import AuthOnly from '../../auth/AuthOnly';
import NavigationButton from './NavigationButton';

const SignedInLinks = () => {
  return (
    <AuthOnly>
      <NavigationButton>My Games</NavigationButton>
      <NavigationButton to="/create">New Game</NavigationButton>
    </AuthOnly>
  );
};

export default SignedInLinks;
