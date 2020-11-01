export type GameEvent = 'round' | 'start' | 'end' | 'player-added';

export type RoundHandler<PlayerType extends IPlayer> = (
  players: Map<string, PlayerType>,
  judgeId: string
) => Promise<string>;

export type StartHandler<PlayerType extends IPlayer> = (
  players: Map<string, PlayerType>
) => Promise<void>;

export type EndHandler = () => Promise<void>;

export type PlayerFactory<T> = (
  name: string,
  answers: withNumericId<string>[]
) => T | null;

export type withNumericId<T = any> = { id: string; value: T };

export type PlayerEvent = 'use';

export type UseHandler = (card: withNumericId<string>) => withNumericId<string>;

export interface IPlayer {
  nickname: string;
  cardsWon: Set<string>;
  currentCards: Set<withNumericId<string>>;
  boradcast(message: any): Promise<void>;

  //events
  useHandler: UseHandler;

  // event handlers
  on(event: 'use', handler: UseHandler): any;
  on(...args: any): any;
}
