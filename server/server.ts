import { serve, Response, acceptable, ServerRequest } from './deps.ts';
import { Game } from './game/Game.ts';
import { Player } from './player/Player.ts';
import { generate } from './shared/NumericID.ts';
import { Acceptable, TestFunction } from './types.ts';

export class Server {
  static async serve(port: number) {
    const server = new Server();
    console.log('server is up');
    for await (const req of serve({ port })) {
      const res = await server.handler(req);
      if (res) req.respond(res);
    }
  }

  static async test(iteration: TestFunction) {
    const server = new Server();
    const tester = serve({ port: 8000 });
    console.log('server is up');
    let i = 0;
    for await (const req of tester) {
      const res = await server.handler(req);
      if (res) req.respond(res);
      i++;
      if (!iteration(server.pendingGames, server.activeGames)) break;
    }
    tester.close();
    return i;
  }

  private pendingGames: Map<string, Game<Player>>;
  private activeGames: Map<string, Game<Player>>;

  constructor() {
    this.pendingGames = new Map();
    this.activeGames = new Map();
  }

  createGame(questions: string[], answers: string[]): Game<Player> {
    const id = generate();
    if (this.activeGames.has(id) || this.pendingGames.has(id))
      return this.createGame(questions, answers);
    const game = new Game<Player>(id, questions, answers);
    game.on('connection', Player.newInstance);
    game.on('start', async () => {
      this.activeGames.set(id, game);
      this.pendingGames.delete(id);
    });
    game.on('round', Player.roundHandler);
    game.on('end', async () => {
      this.activeGames.delete(id);
    });
    this.pendingGames.set(id, game);
    return game;
  }

  async handler(req: ServerRequest): Promise<Response | null> {
    const { url, method } = req;
    const headers: Headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    headers.set('Content-Type', 'application/json');
    if (method === 'OPTIONS') {
      return { status: 200, headers };
    }
    if (url.startsWith('/check')) {
      const params = new URLSearchParams(url.split('?')[1]);
      const code = params.get('code');
      const exists = Boolean(code && this.pendingGames.has(code));
      const status = exists ? 200 : 404;
      return { status, body: JSON.stringify({ exists, status }), headers };
    }
    if (url.startsWith('/create')) {
      console.log('creating game');
      const body = req.body;
      const decoder = new TextDecoder('utf-8');
      const data = JSON.parse(decoder.decode(await Deno.readAll(body)));
      console.log(data);
      if (
        data.playable &&
        typeof data.playable === 'object' &&
        data.playable?.length === 2
      ) {
        const [questions, answers] = data.playable;
        const { id: code } = this.createGame(questions, answers);
        const status = 201;
        return { status, body: JSON.stringify({ code, status }), headers };
      } else {
        return { status: 422, body: JSON.stringify({ err: 'no playable' }) };
      }
    }
    if (url.startsWith('/?') && acceptable(req)) {
      await this.connect(req);
      return null;
    }
    return {
      status: 404,
      body: JSON.stringify({ err: 'not found', code: 404 }),
    };
  }

  async connect(req: ServerRequest): Promise<boolean> {
    const { conn, r: bufReader, w: bufWriter, headers, url } = req;
    const params = new URLSearchParams(url.split('?')[1]);
    const code = params.get('code') || '';
    const name = params.get('name') || 'anonymous';
    const wsParams: Acceptable = { conn, bufReader, bufWriter, headers };
    const game = this.pendingGames.get(code);
    await Player.acceptWebSocket(game, name, wsParams);
    return this.pendingGames.has(code);
  }
}
