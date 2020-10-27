export type RoundFunc<PlayerType = string> = (
  players: PlayerType[],
  judge: { id: string; value: PlayerType },
  question: { id: string; value: string }
) => Promise<void>;

export type withNumericId<T = any> = { id: string; value: T };
