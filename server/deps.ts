export { default as ShortUniqueId } from 'https://cdn.jsdelivr.net/npm/short-unique-id/short_uuid/mod.ts';
export { serve } from 'https://deno.land/std@0.76.0/http/server.ts';
export {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  WebSocket,
  acceptable,
} from 'https://deno.land/std@0.76.0/ws/mod.ts';
export { Timeout } from 'https://deno.land/x/timeout@2.3/mod.ts';

// test deps
export { sleepRandomAmountOfSeconds } from 'https://deno.land/x/sleep/mod.ts';
export {
  assertThrowsAsync,
  assertEquals,
  assertThrows,
} from 'https://deno.land/std@0.76.0/testing/asserts.ts';
