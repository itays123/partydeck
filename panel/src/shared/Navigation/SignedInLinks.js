import NavigationButton from './NavigationButton';

const SignedInLinks = () => {
  return [
    <NavigationButton key="home">My Games</NavigationButton>,
    <NavigationButton to="/create" key="new">
      New Game
    </NavigationButton>,
  ];
};

export default SignedInLinks;
