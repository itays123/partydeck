import { useGameContext } from '../../game/GameContext';
import { IGameContextValue } from '../../game/types';
import Card from '../Card/Card';

type EntryValueChecker = (entryId: string, ctx: IGameContextValue) => boolean;

export default function PlayerIterator({
  iterate,
}: {
  iterate?: EntryValueChecker;
}) {
  const ctx = useGameContext();
  return (
    <>
      {[...ctx.players.keys()].map(playerId => (
        <Card
          small
          inactive={iterate ? !iterate(playerId, ctx) : false}
          key={playerId}
        >
          <div className="flex w-full h-full justify-center mt-8 text-2xl text-theme-800">
            {ctx.players.get(playerId)!}
          </div>
        </Card>
      ))}
    </>
  );
}
