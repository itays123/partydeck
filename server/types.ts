export type RoundFunc<PlayerType extends IPlayer> = (
  players: Map<string, PlayerType>,
  judge: { id: string; value: PlayerType },
  question: { id: string; value: string }
) => Promise<string>;

export type withNumericId<T = any> = { id: string; value: T };

export interface IPlayer {
  nickname: string;
  cardsWon: Set<string>;
  boradcast(message: any): Promise<void>;
}
