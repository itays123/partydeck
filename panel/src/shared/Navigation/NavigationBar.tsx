import { Authenticated, NotAuthenticated } from '../../auth/authFilters';
import Logo from '../../resources/brand/Logo';
import {
  JoinGameLink,
  LinkablePartydeck,
  signedInLinks,
  signedOutActions,
} from './buttons';

export default function NavigationBar() {
  return (
    <nav className="bg-theme-700 h-16 nav px-8 shadow-xl w-screen flex flex-row items-center justify-between">
      <div className="flex items-center space-x-1">
        <Logo size={24} />
        <LinkablePartydeck className="font-roboto font-bold text-white text-lg hover:text-theme-300" />
      </div>
      {/* Search PlaceHolder */}
      <div className="links">
        <Authenticated>
          {signedInLinks.map(Link => (
            <Link className="font-bold font-roboto px-2 py-1 text-theme-200 hover:text-green" />
          ))}
        </Authenticated>
        <NotAuthenticated>
          {signedOutActions.map((Action, i) => (
            <Action
              className="font-bold font-roboto px-2 py-1 text-theme-200 hover:text-green"
              onClick={() => console.log(i)}
            />
          ))}
        </NotAuthenticated>
        <JoinGameLink className="font-bold font-roboto px-3 py-2 text-theme-700 bg-green rounded hover:bg-green-light ml-2" />
      </div>
    </nav>
  );
}
