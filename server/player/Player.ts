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

  static async roundHandler(
    cards: PickedCard[],
    judge: Player
  ): Promise<PickedCard | null> {
    console.log('round started', cards);
    if (cards.length === 0) return null;
    if (cards.length === 1) return cards[0];
    while (judge.pickedCard === null) {
      if (!judge.isConnected) return cards[0];
      const timeout = Timeout.wait(1000);
      await timeout;
    }
    console.log('a card was picked!', judge.pickedCard);
    const pickedPlayer = cards.find(card => card.id === judge.pickedCard);
    judge.pickedCard = null;
    if (pickedPlayer) return pickedPlayer;
    else return null;
  }

  static async acceptWebSocket(
    game: Game<Player> | undefined,
    nickname: string,
    params: Acceptable
  ) {
    const ws = await acceptWebSocket(params);
    if (!game) {
      const message = JSON.stringify({
        err: 'game not found',
        code: 404,
      });
      await ws.send(message);
      await ws.close();
      return;
    }
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
          this.disconnectHandler(this.id, this.isAdmin, this.nickname);
        }
      }
      if (typeof ev === 'string') {
        const msg = JSON.parse(ev);
        if (msg.picked) {
          this.pickCard(msg.picked);
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

  private pickCard(cardId: string) {
    if (this.isJudge) {
      this.pickedCard = cardId;
    } else {
      this.broadcast({ err: 'cannot preform operation', code: 401 });
    }
  }

  async closeConnection() {
    await this.connection.close();
    this.isConnected = false;
  }

  private formatCardsMap(): withNumericId<string>[] {
    let result: withNumericId<string>[] = [];
    for (const [cardId, card] of this.currentCards) {
      result.push({ id: cardId, value: card });
    }
    return result;
  }

  async broadcast(message: any): Promise<void> {
    let data = { ...message };
    if (message.q || message.pick) {
      data['isJudge'] = this.isJudge;
    }
    if (message.q && !this.isJudge) {
      const use = this.formatCardsMap();
      data['use'] = use;
    }
    if (message.count || message.playerWon) {
      const isAdmin = this.isAdmin;
      data['isAdmin'] = isAdmin;
    }
    await this.connection.send(JSON.stringify(data));
  }
}
