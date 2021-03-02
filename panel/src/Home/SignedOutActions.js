import { Link } from 'react-router-dom';
import AuthOnly from '../auth/AuthOnly';
import { GameWebsiteLink } from '../shared/helpers/GameWebsiteLink';

const SignedOutActions = () => {
  return (
    <AuthOnly shouldNotBeAuthenticated>
      <Link
        className="bg-yellow-500 colorful-button animation-scaleup"
        to="/start"
      >
        Get Started
      </Link>
      <Link
        className="bg-pink-500 colorful-button animation-scaleup"
        to="/login"
      >
        Log In
      </Link>
      <a
        className="bg-blue-500 colorful-button animation-scaleup"
        href={GameWebsiteLink}
      >
        Join Game
      </a>
    </AuthOnly>
  );
};

export default SignedOutActions;
