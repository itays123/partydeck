export type GameEvent = 'round' | 'start' | 'end';

export type RoundFunc<PlayerType extends IPlayer> = (
  players: Map<string, PlayerType>,
  judgeId: string
) => Promise<string>;

export type StartFunc<PlayerType extends IPlayer> = (
  players: Map<string, PlayerType>
) => Promise<void>;

export type EndFunc = () => Promise<void>;

export type withNumericId<T = any> = { id: string; value: T };

export interface IPlayer {
  nickname: string;
  cardsWon: Set<string>;
  boradcast(message: any): Promise<void>;
}
