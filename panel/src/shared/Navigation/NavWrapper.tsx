import { Wrapper } from '../Filters/ConditionalWrapper';
import NavigationBar from './NavigationBar';

const NavWrapper = ({ children }: Wrapper) => {
  return (
    <div className="app w-screen h-screen mx-0 overflow-y-hidden flex flex-col">
      <div className="nav-wrapper h-16">
        <NavigationBar />
      </div>
      <div className="flex-grow relative">{children}</div>
    </div>
  );
};

export default NavWrapper;
