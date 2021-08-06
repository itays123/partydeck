import { IGameContextValue } from '../../game/types';

type EntryValueChecker = (entryId: string, ctx: IGameContextValue) => boolean;

export default function PlayerIterator({
  iterate,
}: {
  iterate: EntryValueChecker;
}) {
  return <></>;
}
