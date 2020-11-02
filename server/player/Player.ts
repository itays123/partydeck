import { BasePlayer } from '../game/BasePlayer.ts';
import { withNumericId } from '../types.ts';
import { WebSocket, isWebSocketCloseEvent } from '../deps.ts';

export class Player extends BasePlayer {
  private connection: WebSocket;

  constructor(ws: WebSocket, name: string, answers: withNumericId<string>[]) {
    super(name, answers);
    this.connection = ws;
    console.log(this.id, 'connected');
  }

  async handleWebSocket() {
    for await (const ev of this.connection) {
      if (isWebSocketCloseEvent(ev)) {
        // this.disconnectHandler
        console.log(this.id, 'disconnected');
      }
      if (typeof ev === 'string') {
        this.broadcast(ev.toString());
      }
    }
  }

  async broadcast(message: any): Promise<void> {
    await this.connection.send(message);
  }
}
