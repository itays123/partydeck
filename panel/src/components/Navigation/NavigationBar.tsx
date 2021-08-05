import { Authenticated, NotAuthenticated } from '../../auth/AuthContext';
import Logo from '../brand/Logo';
import ResponsiveAuthPopup from './AuthPopup';
import {
  JoinGameLink,
  LinkablePartydeck,
  Login,
  Register,
  Logout,
  MyDecks,
  NewDeck,
} from './buttons';
import SearchBar from './SearchBar';

export default function NavigationBar() {
  return (
    <nav className="bg-theme-700 h-16 nav px-8 shadow-xl w-screen flex flex-row items-center justify-between">
      <div className="flex items-center space-x-1">
        <Logo className="w-6 h-6" />
        <LinkablePartydeck className="font-roboto font-bold text-white text-lg hover:text-theme-300" />
      </div>
      <div className="links flex items-center">
        <SearchBar />
        <Authenticated>
          <MyDecks className="nav-button hidden-sm" />
          <NewDeck className="nav-button hidden-sm" />
          <Logout className="nav-button hidden-sm" />
        </Authenticated>
        <NotAuthenticated>
          <Login className="nav-button hidden-sm" />
          <Register className="nav-button hidden-sm" />
        </NotAuthenticated>
        <ResponsiveAuthPopup />
        <JoinGameLink className="font-bold font-roboto px-1.5 md:px-3 py-1.5 md:py-2 text-theme-700 bg-green rounded-full hover:bg-green-light md:ml-2 text-sm md:text-base" />
      </div>
    </nav>
  );
}
