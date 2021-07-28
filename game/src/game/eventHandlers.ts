import { useCallback, useState } from 'react';
import { ConnectionLifecycle, IGameData, PauseHandlerHook } from './types';
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
    if (state.connectionStatus !== ConnectionLifecycle.RESUMED)
      dispatch({ type: 'DISCONNECTED' });
  }, [dispatch, state.connectionStatus]);

  const pauseCallback = useCallback(() => {
    if (
      state.showEndScreen ||
      state.connectionStatus === ConnectionLifecycle.PRE_CREATED ||
      state.connectionStatus === ConnectionLifecycle.PAUSED
    ) {
      // disconnection is expected, or an error is prevting the connection from reconnecting
      console.log('expected disconnection');
      dispatch({ type: 'DISCONNECTED' });
    } else if (state.connectionStatus === ConnectionLifecycle.REFRESHING) {
      dispatch({ type: 'REFRESH_FAILED' });
    } else if (state.connectionStatus !== ConnectionLifecycle.GOING_AWAY) {
      // connection is unexpected, and not attempting reconnection
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
    state.connectionStatus,
  ]);

  const registerConnectFunction = useCallback((fn: ConnectFN) => {
    setConnectFn(() => fn); // do this to avoid confusing the react dispatch function
  }, []);

  return [registerConnectFunction, pauseCallback];
};
