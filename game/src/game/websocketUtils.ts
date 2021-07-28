import { useCallback, useEffect, useState } from 'react';
import {
  Contextable,
  SessionConnectHandler,
  SessionDisconnectHandler,
  SessionHook,
  SessionMessageHnalder,
} from './types';

export function useSession(
  onOpen: SessionConnectHandler,
  onMessage: SessionMessageHnalder,
  onClose: SessionDisconnectHandler
): SessionHook {
  const [session, setSession] = useState(null as unknown as WebSocket);

  const updateOpenHandler = () => {
    if (!session) return;
    session.addEventListener('open', onOpen);
    return () => {
      session.removeEventListener('open', onOpen);
    };
  };

  const updateMessageHandler = () => {
    if (!session) return;
    session.addEventListener('message', onMessage);
    return () => {
      session.removeEventListener('message', onMessage);
    };
  };

  const updateCloseHandler = () => {
    if (!session) return;
    session.addEventListener('close', onClose);
    return () => {
      session.removeEventListener('close', onClose);
    };
  };

  useEffect(updateOpenHandler, [session, onOpen]);
  useEffect(updateMessageHandler, [session, onMessage]);
  useEffect(updateCloseHandler, [session, onClose]);

  const connect = useCallback(
    (gameCode: string, name: string | null, playerId?: string) => {
      const uri = `${process.env.REACT_APP_SERVER_WS}?code=${gameCode}&${
        playerId ? `id=${playerId}` : `name=${name}`
      }`;
      const ws = new WebSocket(uri);
      setSession(ws);
    },
    []
  );

  const sendMessage = <T extends Contextable>(args: T) => {
    session.send(JSON.stringify(args));
  };

  const close = useCallback(() => {
    if (session.readyState === session.OPEN) session.close();
  }, [session]);

  return [connect, sendMessage, close];
}
