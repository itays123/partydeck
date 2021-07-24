import { atom, focusAtom, useAtom } from 'klyva';

const websocketAtom = atom<WebSocket>({} as WebSocket);
const messageHandlerAtom = focusAtom(websocketAtom, optic =>
  optic.prop('onmessage')
);
export const connectedAtom = atom(get => {
  const ws = get(websocketAtom);
  return ws && ws.readyState === ws.OPEN;
});

export const connect = (
  gameCode: string,
  name: string | null,
  playerId?: string
) => {
  const uri = `${process.env.REACT_APP_SERVER_WS}?code=${gameCode}&${
    playerId ? `id=${playerId}` : `name=${name}`
  }`;
  const ws = new WebSocket(uri);
  ws.onopen = () => websocketAtom.update(ws);
};

export interface Contextable {
  context: string;
}

type Handler = (ev: MessageEvent<any>) => any;
type sessionHook = [
  (handler: Handler) => void,
  <T extends Contextable>(args: T) => void
];

export function useSession(): sessionHook {
  const [session] = useAtom(websocketAtom);
  const [, setHandler] = useAtom(messageHandlerAtom);

  const onMessage = (handler: Handler) => {
    setHandler(() => handler);
  };

  const sendMessage = <T extends Contextable>(args: T) => {
    session.send(JSON.stringify(args));
  };

  return [onMessage, sendMessage];
}
