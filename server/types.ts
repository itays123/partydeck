export type GameEvent = 'round' | 'start' | 'end' | 'player-added';

export type RoundHandler<PlayerType> = (
  cards: PickedCard[],
  judgeId: PlayerType,
  players: Map<string, PlayerType>
) => Promise<string>;

export type StartHandler<PlayerType> = (
  players: Map<string, PlayerType>
) => Promise<void>;

export type EndHandler = () => Promise<void>;

export type PlayerFactory<T> = (
  name: string,
  answers: withNumericId<string>[],
  ...args: any
) => T | null;

export type withNumericId<T = any> = { id: string; value: T };

export type PlayerEvent = 'use' | 'disconnect';

export type UseHandler = (cardId: string) => withNumericId<string>;

export type DisconnectHandler = (playerId: string) => any;

export type PickedCard = { playerId: string } & withNumericId<string>;

export type Acceptable = {
  conn: Deno.Conn;
  bufWriter: any;
  bufReader: any;
  headers: Headers;
};
