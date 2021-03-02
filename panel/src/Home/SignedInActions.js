import { Link } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthContext';
import AuthOnly from '../auth/AuthOnly';
import { GameWebsiteLink } from '../shared/helpers/GameWebsiteLink';

const SignedInActions = () => {
  const { logout } = useAuthContext();
  return (
    <AuthOnly>
      <Link
        className="bg-yellow-500 colorful-button animation-scaleup"
        to="/create"
      >
        Create New Game
      </Link>
      <a
        className="bg-pink-500 colorful-button animation-scaleup"
        href={GameWebsiteLink}
      >
        Join Game
      </a>
      <button
        className="bg-blue-400 colorful-button animation-scaleup"
        href="/"
        onClick={() => logout()}
      >
        Log Out
      </button>
    </AuthOnly>
  );
};

export default SignedInActions;
