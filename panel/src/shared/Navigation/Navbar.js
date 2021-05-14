import { GameWebsiteLink } from '../helpers/GameWebsiteLink';
import Search from '../Search/Search';
import NavigationButton from './NavigationButton';
import logo from '../../partydeck.svg';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-100 nav px-8 w-screen flex">
      <div className="md:px-4 lg:px-6 flex items-center h-16 md:ml-8">
        <img src={logo} width={20} height={20} alt="" />
        <Link to="/" className="text-lg md:text-xl text-purple-900 font-bold">
          Partydeck
        </Link>
      </div>
      <Search className="flex-grow py-3 hidden md:block" />
      <div className="links flex flex-grow md:flex-none items-stretch justify-end pl-4">
        <SignedOutLinks />
        <NavigationButton to={GameWebsiteLink} external>
          Join Game
        </NavigationButton>
        <SignedInLinks />
      </div>
    </nav>
  );
};

export default Navbar;
