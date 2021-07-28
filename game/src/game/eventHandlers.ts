import { useCallback, useState } from 'react';
import { IGameData, PauseHandlerHook } from './types';
import { ConnectFN, Contextable } from './types';

export const useConnectionCallback = () => {
  const callback = useCallback(() => {}, []);
  return callback;
};

export const useMessageCallback = (dispatch: React.Dispatch<any>) => {
  const callback = useCallback(
    (ev: MessageEvent<any>) => {
      const data: Contextable = JSON.parse(ev.data);
      console.log(data);
      if (data.context) dispatch({ type: data.context, payload: data });
    },
    [dispatch]
  );
  return callback;
};

export const useConnectionPauseHandler = (
  state: IGameData,
  dispatch: React.Dispatch<any>
): PauseHandlerHook => {
  const [connectFn, setConnectFn] = useState<ConnectFN>(
    null as unknown as ConnectFN
  );

  const disconnectCallback = useCallback(() => {
    if (!state.isConnectionResumed) dispatch({ type: 'DISCONNECTED' });
  }, [dispatch, state.isConnectionResumed]);

  const pauseCallback = useCallback(() => {
    if (state.showEndScreen) {
      // disconnection is expected
      console.log('expected disconnection');
      dispatch({ type: 'DISCONNECTED' });
    } else {
      // try to reconnect
      console.log('unexpected disconnection');
      dispatch('SESSION_PAUSED');
      if (connectFn) connectFn(state.gameCode!, null, state.playerId);
      setTimeout(disconnectCallback, 30 * 1000);
    }
  }, [
    disconnectCallback,
    dispatch,
    connectFn,
    state.gameCode,
    state.playerId,
    state.showEndScreen,
  ]);

  const registerConnectFunction = useCallback((fn: ConnectFN) => {
    setConnectFn(() => fn); // do this to avoid confusing the react dispatch function
  }, []);

  return [registerConnectFunction, pauseCallback];
};
