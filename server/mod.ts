import { CONSOLE, PORT } from './config.ts';
import { Server } from './server.ts';

if (!CONSOLE) {
  console.log = function (...args: any[]) {};
}

await Server.serve(PORT);
