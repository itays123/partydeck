import { useProfile } from './useProfile';
import { useParams } from 'react-router-dom';
import GameList from '../../shared/GameList/GameList';
import UserDetails from './UserDetails';
import HomepageActions from './HomepageActions';

const Profile = () => {
  const { id } = useParams();
  const profile = useProfile(id);
  return (
    <div className="profile container mx-auto">
      {id ? <UserDetails profile={profile} /> : <HomepageActions />}
      <GameList games={profile.games} sharedAuthor={profile} />
    </div>
  );
};

export default Profile;
