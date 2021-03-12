import { useProfile } from './useProfile';
import { Redirect, useParams } from 'react-router-dom';
import GameList from '../../shared/GameList/GameList';
import UserDetails from './UserDetails';
import { useAuthContext } from '../AuthContext';
import Spinner from '../../shared/Spinner';

const Profile = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const profile = useProfile(id);
  if (user?._id === id) return <Redirect to="/" />;
  return (
    <div className="profile container mx-auto">
      {profile.isLoading ? (
        <div className="flex mt-8">
          <Spinner />
          Loading...
        </div>
      ) : (
        <>
          <UserDetails profile={profile} />
          <GameList games={profile.games} sharedAuthor={profile} />
        </>
      )}
    </div>
  );
};

export default Profile;
