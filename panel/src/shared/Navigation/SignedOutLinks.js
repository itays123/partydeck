import NavigationButton from './NavigationButton';

const SignedOutLinks = () => {
  return [
    <NavigationButton to="/login" key="login">
      Login
    </NavigationButton>,
    <NavigationButton to="/register" key="register">
      Get Started
    </NavigationButton>,
  ];
};

export default SignedOutLinks;
