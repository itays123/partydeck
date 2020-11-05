import { BasePlayer } from '../game/BasePlayer.ts';
import { PickedCard, withNumericId } from '../types.ts';
import { WebSocket, isWebSocketCloseEvent, Timeout } from '../deps.ts';

export class Player extends BasePlayer {
  private connection: WebSocket;
  private pickedCard: string | null;

  constructor(ws: WebSocket, name: string, answers: withNumericId<string>[]) {
    super(name, answers);
    this.connection = ws;
    this.pickedCard = null;
    console.log(this.id, 'connected');
  }

  async handleWebSocket() {
    for await (const ev of this.connection) {
      if (isWebSocketCloseEvent(ev)) {
        if (this.disconnectHandler) {
          this.disconnectHandler(this.id);
        }
      }
      if (typeof ev === 'string') {
        const msg = JSON.parse(ev);
        console.log(msg);
        if (msg.picked) {
          this.pickedCard = msg.picked;
        }
        if (msg.used) {
          this.useCard(msg.used);
        }
        this.broadcast(ev.toString()); // for testing purposes
      }
    }
  }

  async closeConnection() {
    await this.connection.close();
  }

  private formatCardsMap(): [string, string][] {
    let result: [string, string][] = [];
    for (const [cardId, card] of this.currentCards) {
      result.push([cardId, card]);
    }
    return result;
  }

  async broadcast(message: any, withCards: boolean = false): Promise<void> {
    if (!withCards) {
      await this.connection.send(JSON.stringify(message));
    } else {
      const options = this.formatCardsMap();
      await this.connection.send(JSON.stringify({ ...message, options }));
    }
  }

  async pickCard(cards: PickedCard[]): Promise<string> {
    console.log('wating for judge...');
    this.broadcast(cards);
    while (this.pickedCard === null) {
      const timeout = Timeout.wait(1000);
      await timeout;
    }
    const pickedPlayer = cards.find(card => card.id === this.pickedCard)!
      .playerId;
    this.pickedCard = null;
    return pickedPlayer;
  }
}
