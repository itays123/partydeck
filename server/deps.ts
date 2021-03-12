export { default as ShortUniqueId } from 'https://cdn.jsdelivr.net/npm/short-unique-id/short_uuid/mod.ts';
import {
  serve,
  Response as ResponseType,
  ServerRequest,
} from 'https://deno.land/std@0.76.0/http/server.ts';
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  WebSocket as WebSocketType,
  acceptable,
} from 'https://deno.land/std@0.76.0/ws/mod.ts';
export {
  serve,
  ServerRequest,
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  acceptable,
};
export { Timeout } from 'https://deno.land/x/timeout@2.4/mod.ts';

// test deps
export { sleepRandomAmountOfSeconds } from 'https://deno.land/x/sleep/mod.ts';
export {
  assertThrowsAsync,
  assertEquals,
  assertThrows,
} from 'https://deno.land/std@0.76.0/testing/asserts.ts';

export type Response = ResponseType;
export type WebSocket = WebSocketType;
