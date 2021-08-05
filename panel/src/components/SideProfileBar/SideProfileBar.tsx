import { useMemo } from 'react';
import {
  ProfileBarClose,
  ProfileBarOpen,
  useProfile,
} from './SideProfileBarProvider';

export default function SideProfileBar() {
  const { name, games } = useProfile();
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
      <div className="absolute inset-0 md:static md:w-1/3 transition-all flex flex-col py-4 px-8">
        <ProfileBarClose className="justify-self-end" width={24} height={24} />
      </div>
    </ProfileBarOpen>
  );
}
