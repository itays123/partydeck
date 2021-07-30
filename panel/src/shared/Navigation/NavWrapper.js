import Navbar from './Navbar';

const NavWrapper = ({ children }) => {
  return (
    <div className="app w-screen h-screen mx-0 overflow-y-hidden flex flex-col">
      <div className="nav-wrapper h-16">
        <Navbar />
      </div>
      <div className="flex-grow relative">{children}</div>
    </div>
  );
};

export default NavWrapper;
