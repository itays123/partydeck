export type RoundFunc<PlayerType = string> = (
  players: PlayerType[],
  judge: { id: number; value: PlayerType },
  question: { id: number; value: string }
) => Promise<void>;

export type withNumericId<T = any> = { id: number; value: T };
