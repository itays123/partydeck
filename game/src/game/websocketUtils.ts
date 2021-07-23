import { gameAtom } from './gameAtom';
import { updateStateFromContext } from './gameEventHandler';
import {
  BroadcastContext,
  ConnectionLifecycle,
  IGameAtom,
  RoundLifeCycle,
} from './types';

export const connect = (
  gameCode: string,
  name: string | null,
  playerId?: string
) => {
  const uri = `${process.env.REACT_APP_SERVER_WS}?code=${gameCode}&${
    playerId ? `id=${playerId}` : `name=${name}`
  }`;
  const ws = new WebSocket(uri);
  ws.onopen = handleWsOpen(ws);
  ws.onmessage = handleWsMessage;
  ws.onclose = handleConnectionPause;
};

/*
 * Events
 */

const handleWsOpen = (ws: WebSocket) => () => {
  gameAtom.update((state: IGameAtom) => ({
    ...state,
    connectionState: ConnectionLifecycle.RESUMED,
    session: ws,
  }));
};

const handleWsMessage = (evt: MessageEvent<any>) => {
  const data = JSON.parse(evt.data);
  if (data.context)
    gameAtom.update((state: IGameAtom) => ({
      ...state,
      ...updateStateFromContext(
        BroadcastContext[data.context as keyof typeof BroadcastContext],
        data,
        state
      ),
    }));
};

const handleConnectionPause = () => {
  const { playerId, gameCode, connectionState } = gameAtom.getValue();
  if (connectionState === ConnectionLifecycle.DESTOYED)
    // expected disconnection
    return;

  gameAtom.update((state: IGameAtom) => ({
    ...state,
    connectionState: ConnectionLifecycle.PAUSED,
  }));
  setTimeout(handleConnectionDestroy, 30000);

  // try to reconnect
  connect(gameCode, null, playerId);
};

const handleConnectionDestroy = () => {
  const { connectionState } = gameAtom.getValue();
  if (connectionState !== ConnectionLifecycle.RESUMED)
    gameAtom.update((state: IGameAtom) => ({ ...state, session: null }));
};

/*
 * Message-related methods
 */

const sendMessage = <T extends object>(context: BroadcastContext, args: T) => {
  const { session, connectionState } = gameAtom.getValue();
  if (connectionState !== ConnectionLifecycle.RESUMED || session === null)
    return;

  const payload = { ...args, context: BroadcastContext[context] };
  session.send(JSON.stringify(payload));
};

export const start = () => sendMessage(BroadcastContext.START, {});
export const stop = () => sendMessage(BroadcastContext.STOP, {});
export const skip = () => sendMessage(BroadcastContext.SKIP, {});
export const next = () => sendMessage(BroadcastContext.NEXT, {});

export const useOrPickCard = (cardId: string) => {
  const { state, isJudge } = gameAtom.getValue().roundState;
  if (isJudge && state === RoundLifeCycle.PICK) {
    sendMessage(BroadcastContext.PICKED, { picked: cardId });
  }
  if (!isJudge && state === RoundLifeCycle.USE) {
    sendMessage(BroadcastContext.USED, { used: cardId });
    gameAtom.update((state: IGameAtom) => ({
      ...state,
      roundState: {
        ...state.roundState,
        state: RoundLifeCycle.PENDING_PLAYER_USAGES,
      },
    }));
  }
};
