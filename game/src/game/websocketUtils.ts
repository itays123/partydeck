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

  const updateOpenHandler = () => {
    if (!session) return;
    console.log('setting session onopen...');
    session.addEventListener('open', onOpen);
    return () => {
      session.removeEventListener('open', onOpen);
    };
  };

  const updateMessageHandler = () => {
    if (!session) return;
    console.log('setting session onmessage...');
    session.addEventListener('message', onMessage);
    return () => {
      session.removeEventListener('message', onMessage);
    };
  };

  const updateCloseHandler = () => {
    if (!session) return;
    console.log('setting session onclose...');
    session.addEventListener('close', onClose);
    return () => {
      console.log('removing session onclose...');
      session.removeEventListener('close', onClose);
    };
  };

  useEffect(updateOpenHandler, [session, onOpen]);
  useEffect(updateMessageHandler, [session, onMessage]);
  useEffect(updateCloseHandler, [session, onClose]);

  const connect = (
    gameCode: string,
    name: string | null,
    playerId?: string
  ) => {
    const uri = `${process.env.REACT_APP_SERVER_WS}?code=${gameCode}&${
      playerId ? `id=${playerId}` : `name=${name}`
    }`;
    const ws = new WebSocket(uri);
    setSession(ws);
  };

  const sendMessage = <T extends Contextable>(args: T) => {
    session.send(JSON.stringify(args));
  };

  return [connect, sendMessage];
}
