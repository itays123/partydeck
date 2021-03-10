import { Link } from 'react-router-dom';

const SignedInDialog = () => {
  return (
    <div className="dialog bg-gray-100 shadow rounded px-2 py-2 absolute top-0 mt-12 right-0 z-50 w-40">
      <Link to="/" className="link-li">
        My Games
      </Link>
      <Link to="/create" className="link-li md:hidden">
        New Game
      </Link>
    </div>
    // break, log out
  );
};

export default SignedInDialog;
