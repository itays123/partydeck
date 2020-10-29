import { IPlayer } from '../../types.ts';

export class TestPlayer implements IPlayer {
  nickname: string;
  cardsWon: Set<string>;

  constructor(name: string) {
    this.nickname = name;
    this.cardsWon = new Set();
  }

  async boradcast(message: any): Promise<void> {
    console.log('on:', this.nickname, 'message:', JSON.stringify(message));
  }
}
