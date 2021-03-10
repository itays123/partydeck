import { Link } from 'react-router-dom';
import { useAuthContext } from '../../auth/AuthContext';

const SignedInDialog = () => {
  const { user, logout } = useAuthContext();
  return (
    <div className="dialog bg-gray-100 shadow rounded px-2 py-2 absolute top-0 mt-12 right-0 z-50 w-52 text-left">
      <p className="mb-2">
        Signed in as <span className="font-medium">{user.name}</span>
      </p>
      <Link to="/" className="link-li">
        My Games
      </Link>
      <Link to="/create" className="link-li md:hidden">
        New Game
      </Link>
      <a href="/" className="link-li" onClick={logout}>
        Log out
      </a>
    </div>
  );
};

export default SignedInDialog;
