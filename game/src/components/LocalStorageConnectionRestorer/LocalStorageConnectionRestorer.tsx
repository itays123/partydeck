import { Component } from 'react';
import { GameContext } from '../../game/GameContext';
import { ConnectionLifecycle } from '../../game/types';
import { Wrapper } from '../../shared/types';
import LocalStorageUtils from './localstorageUtils';

export default class LocalStorageConnectionRestorer extends Component<Wrapper> {
  static contextType = GameContext;
  state = { isReady: false };
  saveValuesBeforeUnload = () => {
    const { connectionStatus, showEndScreen, gameCode, playerId, close } =
      this.context;
    if (connectionStatus === ConnectionLifecycle.RESUMED && !showEndScreen) {
      // going away before game is over
      console.log('saving reconnection before unmount', gameCode, playerId);
      LocalStorageUtils.setValues(gameCode!, playerId!);
      close();
    }
  };
  componentDidMount() {
    const [gameCode, playerId] = LocalStorageUtils.getValues();
    if (gameCode && playerId) {
      console.log('attempting reconnection after render');
      this.context.reconnect(gameCode, playerId);
      LocalStorageUtils.deleteValues();
    }
    this.setState({ isReady: true });
    window.addEventListener('beforeunload', this.saveValuesBeforeUnload);
  }
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveValuesBeforeUnload);
  }
  render() {
    return this.state.isReady ? (
      this.props.children
    ) : (
      <div className="flex items-center justify-center">Loading...</div>
    );
  }
}
