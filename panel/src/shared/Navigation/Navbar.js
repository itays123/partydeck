import { GameWebsiteLink } from '../helpers/GameWebsiteLink';
import Search from '../Search/Search';
import NavigationButton from './NavigationButton';
import logo from './partydeck.svg';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = () => {
  return (
    <nav className="bg-gray-100 nav px-8 w-screen flex">
      <div className="md:px-4 lg:px-6 flex items-center h-16 ml-8">
        <img src={logo} width={20} height={20} alt="" />
        <h1 className="text-xl text-purple-900 font-bold">Partydeck</h1>
      </div>
      <Search className="flex-grow py-3 hidden md:block" />
      <div className="links flex items-stretch pl-4">
        <SignedInLinks />
        <SignedOutLinks />
        <NavigationButton to={GameWebsiteLink} external>
          Join Game
        </NavigationButton>
      </div>
    </nav>
  );
};

export default Navbar;
