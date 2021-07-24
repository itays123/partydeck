import { Component } from 'react';
import GameContext from '../../game/GameContext';
import { GameLifecycle } from '../../game/types';
import { connect } from '../../game/websocketUtils';

export function withSavedInstanceState(
  ComponentToRender: React.ComponentType<any>
) {
  return class SavedInstanceState extends Component<{}> {
    static contextType = GameContext as any;
    state = { loading: true };
    componentDidMount() {
      const playerId = localStorage.getItem('playerId');
      const gameCode = localStorage.getItem('gameCode');
      if (playerId && gameCode) {
        connect(gameCode, null, playerId);
        localStorage.removeItem('playerId');
        localStorage.removeItem('gameCode');
      }
      this.setState({ loading: false });
    }
    componentWillUnmount() {
      // save neccesary data if needed
      const { gameState, gameCode, playerId } = this.context;
      if (
        gameState !== GameLifecycle.DESTROYED &&
        gameState !== GameLifecycle.STOPPED
      ) {
        localStorage.setItem('playerId', playerId);
        localStorage.setItem('gameCode', gameCode);
      }
    }
    render() {
      return this.state.loading ? null /* Loading feedback */ : (
        <ComponentToRender />
      );
    }
  };
}
