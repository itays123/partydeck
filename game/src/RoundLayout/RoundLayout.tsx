import GameCodeDisplay from '../components/GameCodeDisplay/GameCodeDisplay';
import BeforeOptionsReadyLayout from './layout/BeforeOptionsReadyLayout';
import OptionsReadyLayout from './layout/OptionsReadyLayout';
import RoundEndedLayout from './layout/RoundEndedLayout';
import UseDeckLayout from './layout/UseDeckLayout';
import {
  PendingNextRoundOnly,
  PickOptionsReady,
  UsingOnly,
  WaitingForPlayersOnly,
} from './RoundLogicalWrappers';

export default function RoundLayout() {
  return (
    <div className="flex flex-col items-center w-full h-full py-8 px-8">
      <UsingOnly>
        <UseDeckLayout />
      </UsingOnly>
      <WaitingForPlayersOnly>
        <BeforeOptionsReadyLayout />
      </WaitingForPlayersOnly>
      <PickOptionsReady>
        <OptionsReadyLayout />
      </PickOptionsReady>
      <PendingNextRoundOnly>
        <RoundEndedLayout />
      </PendingNextRoundOnly>
      <div className="absolute bottom-0 left-0 px-8 py-4">
        <GameCodeDisplay />
      </div>
    </div>
  );
}
