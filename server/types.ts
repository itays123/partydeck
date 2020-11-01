export type GameEvent = 'round' | 'start' | 'end';

export type RoundHandler<PlayerType extends IPlayer> = (
  players: Map<string, PlayerType>,
  judgeId: string
) => Promise<string>;

export type StartHandler<PlayerType extends IPlayer> = (
  players: Map<string, PlayerType>
) => Promise<void>;

export type EndHandler = () => Promise<void>;

export type withNumericId<T = any> = { id: string; value: T };

export interface IPlayer {
  nickname: string;
  cardsWon: Set<string>;
  currentCards: Set<string>;
  boradcast(message: any): Promise<void>;
}
