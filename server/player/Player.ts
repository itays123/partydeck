import { BasePlayer } from './BasePlayer.ts';
import { Acceptable, PickedCard, withNumericId } from '../types.ts';
import {
  WebSocket,
  acceptWebSocket,
  isWebSocketCloseEvent,
  Timeout,
} from '../deps.ts';
import { Game } from '../game/Game.ts';

export class Player extends BasePlayer {
  static newInstance(
    name: string,
    cards: withNumericId<string>[],
    ws: WebSocket
  ): Player {
    const player = new Player(ws, name, cards);
    player.handleWebSocket();
    console.log(player.id, 'connected');
    return player;
  }

  static async roundHandler(cards: PickedCard[], judge: Player) {
    console.log('round started', cards);
    while (judge.pickedCard === null) {
      const timeout = Timeout.wait(1000);
      await timeout;
    }
    console.log('a card was picked!', judge.pickedCard);
    const pickedPlayer = cards.find(card => card.id === judge.pickedCard)!
      .playerId;
    judge.pickedCard = null;
    return pickedPlayer;
  }

  static async acceptWebSocket(
    game: Game<Player>,
    nickname: string,
    params: Acceptable
  ) {
    const ws = await acceptWebSocket(params);
    const player = game.addPlayer(nickname, ws);
    if (player) {
      await player.broadcast({ id: player.id, game: game.id });
    } else {
      const message = JSON.stringify({
        err: 'player limit exceeded',
        code: 403,
      });
      await ws.send(message);
      await ws.close();
    }
  }

  private connection: WebSocket;
  public pickedCard: string | null;
  public isConnected: boolean;

  constructor(ws: WebSocket, name: string, answers: withNumericId<string>[]) {
    super(name, answers);
    this.connection = ws;
    this.pickedCard = null;
    this.isConnected = false;
  }

  async handleWebSocket() {
    this.isConnected = true;
    for await (const ev of this.connection) {
      if (isWebSocketCloseEvent(ev)) {
        if (this.disconnectHandler) {
          this.isConnected = false;
          this.disconnectHandler(this.id);
        }
      }
      if (typeof ev === 'string') {
        const msg = JSON.parse(ev);
        if (msg.picked) {
          this.pickedCard = msg.picked;
        } else if (msg.used) {
          this.useCard(msg.used);
        } else if (
          msg.dispatch === 'start' &&
          this.startHandler &&
          this.isAdmin
        ) {
          this.startHandler();
        } else if (
          msg.dispatch === 'stop' &&
          this.stopHandler &&
          this.isAdmin
        ) {
          this.stopHandler();
        }
      }
    }
  }

  async closeConnection() {
    await this.connection.close();
    this.isConnected = false;
  }

  private formatCardsMap(): [string, string][] {
    let result: [string, string][] = [];
    for (const [cardId, card] of this.currentCards) {
      result.push([cardId, card]);
    }
    return result;
  }

  async broadcast(message: any, withCards: boolean = false): Promise<void> {
    const isAdmin = this.isAdmin;
    if (!withCards) {
      await this.connection.send(JSON.stringify({ ...message, isAdmin }));
    } else {
      const options = this.formatCardsMap();
      const data = JSON.stringify({ ...message, options, isAdmin });
      await this.connection.send(data);
    }
  }
}
