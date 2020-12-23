import logo from '../partydeck.svg';

const Navbar = () => {
  return (
    <div className="nav px-8 w-screen flex">
      <nav className="flex items-center h-16 flex-grow border-b border-purple-700">
        <div className="flex-grow px-6">
          <img src={logo} width={16} height={16} alt="" />
          <h1 className="text-xl text-gray-200 font-bold">Partydeck</h1>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
