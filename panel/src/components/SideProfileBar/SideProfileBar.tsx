import { useMemo } from 'react';
import Spinner from '../../shared/Spinner';
import GameList from '../GameList/GameList';
import {
  ProfileBarClose,
  ProfileBarOpen,
  ProfileLoading,
  ProfilePresent,
  useProfile,
} from './SideProfileBarProvider';

export default function SideProfileBar() {
  const { name, games, _id } = useProfile();
  const totalCards = useMemo(
    () =>
      (games || []).reduce(
        (prev, { questionCount, answerCount }) =>
          prev + questionCount + answerCount,
        0
      ),
    [games]
  );

  return (
    <ProfileBarOpen>
      <div className="absolute inset-0 md:static md:w-4/10 transition-all flex flex-col py-4 px-8 bg-white">
        <ProfileBarClose
          className="self-end rounded-full bg-theme-800 text-white p-0.5"
          width={20}
          height={20}
        />
        <ProfileLoading>
          <Spinner />
        </ProfileLoading>
        <ProfilePresent>
          <div className="details mt-8">
            <h1 className="text-left font-bold text-theme-800">{name}</h1>
            <h2 className="text-xl">
              {totalCards} cards in {games?.length} decks
            </h2>
          </div>
          <div className="flex-grow overflow-y-scroll mt-8 -mx-4">
            <h3 className="text-lg font-medium px-4">More from {name}</h3>
            <GameList sharedAuthor={{ name, _id }} games={games} />
          </div>
        </ProfilePresent>
      </div>
    </ProfileBarOpen>
  );
}
