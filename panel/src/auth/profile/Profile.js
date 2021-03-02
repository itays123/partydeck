import { useProfile } from './useProfile';
import { Redirect, useParams } from 'react-router-dom';
import GameList from '../../shared/GameList/GameList';
import UserDetails from './UserDetails';
import { useAuthContext } from '../AuthContext';

const Profile = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const profile = useProfile(id);
  return user._id === id ? (
    <Redirect to="/" />
  ) : (
    <div className="profile container mx-auto">
      <UserDetails profile={profile} />
      <GameList games={profile.games} sharedAuthor={profile} />
    </div>
  );
};

export default Profile;
