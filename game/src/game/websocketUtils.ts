import { useEffect, useState } from 'react';
import {
  SessionConnectHandler,
  SessionDisconnectHandler,
  SessionMessageHnalder,
} from './types';

export interface Contextable {
  context: string;
}

type sessionHook = [
  (gameCode: string, name: string | null, playerId?: string) => void,
  <T extends Contextable>(args: T) => void
];

export function useSession(
  onOpen: SessionConnectHandler,
  onMessage: SessionMessageHnalder,
  onClose: SessionDisconnectHandler
): sessionHook {
  const [session, setSession] = useState(null as unknown as WebSocket);

  /*
  useEffect(() => {
    if (!session) return;
    session.addEventListener('open', onOpen);
    session.addEventListener('message', onMessage);
    session.addEventListener('close', onClose);
    return () => {
      session.removeEventListener('open', onOpen);
      session.removeEventListener('message', onMessage);
      session.removeEventListener('close', onClose);
    };
  }, [session, onOpen, onMessage, onClose]);
  */

  const connect = (
    gameCode: string,
    name: string | null,
    playerId?: string
  ) => {
    const uri = `${process.env.REACT_APP_SERVER_WS}?code=${gameCode}&${
      playerId ? `id=${playerId}` : `name=${name}`
    }`;
    const ws = new WebSocket(uri);
    ws.onopen = onOpen;
    ws.onmessage = onMessage;
    ws.onclose = onClose;
    setSession(ws);
  };

  const sendMessage = <T extends Contextable>(args: T) => {
    session.send(JSON.stringify(args));
  };

  return [connect, sendMessage];
}
