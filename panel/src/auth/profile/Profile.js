import { useProfile } from './useProfile';
import { Redirect, useParams } from 'react-router-dom';
import GameList from '../../shared/GameList/GameList';
import UserDetails from './UserDetails';
import { useAuthContext } from '../AuthContext';
import Spinner from '../../shared/Spinner';
import PageNotFound from '../../shared/PageNotFound';

const Profile = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const profile = useProfile(id);
  if (user?._id === id) return <Redirect to="/" />;
  if (profile.isLoading)
    return (
      <div className="container mx-auto flex mt-8">
        <Spinner />
        Loading...
      </div>
    );
  if (profile.status === 404) return <PageNotFound />;

  return (
    <div className="profile container mx-auto px-8 md:px-0">
      <UserDetails profile={profile} />
      <GameList games={profile.games} sharedAuthor={profile} />
    </div>
  );
};

export default Profile;
