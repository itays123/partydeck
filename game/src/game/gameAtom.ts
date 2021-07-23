import { atom, useAtom } from 'klyva';
import {
  ConnectionLifecycle,
  GameLifecycle,
  IGameAtom,
  RoundState,
} from './types';

export const gameAtom = atom<IGameAtom>({
  session: null,
  connectionState: ConnectionLifecycle.PRE_CREATED,
  gameState: GameLifecycle.PRE_CREATED,
  roundState: {
    round: 0,
  } as RoundState,
  gameCode: '',
  playerId: '',
  count: 1,
  isAdmin: false,
});

export function useGame() {
  const [value] = useAtom(gameAtom);
  return value;
}
