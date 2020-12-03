import { BasePlayer } from '../player/BasePlayer.ts';
import { withNumericId } from '../types.ts';

export class TestPlayer extends BasePlayer {
  private useCards: boolean;
  constructor(
    name: string,
    answerCards: withNumericId<string>[],
    useCards = true
  ) {
    super(name, answerCards);
    this.useCards = useCards;
  }

  async broadcast(message: any): Promise<void> {
    if (typeof message === 'object') {
      if (message.q) {
        let pickedCard: string;
        for (const cardId of this.currentCards.keys()) {
          pickedCard = cardId;
          if (Math.random() < 0.25) break;
        }
        if (this.useCards) this.useCard(pickedCard!);
      }
    }
  }

  async closeConnection() {
    // cool!
  }
}
