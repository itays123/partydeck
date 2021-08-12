import Card from '../components/Card/Card';
import { createWrapper } from '../components/logicalWrapperFactory';
import { GameContext } from '../game/GameContext';
import Spinner from '../components/Spinner/Spinner';
import { EnoughPlayers } from './lobbyButtons';

const TwoPlayersLeft = createWrapper(GameContext, ctx => ctx.playerCount === 1);
const OnePlayerLeft = createWrapper(GameContext, ctx => ctx.playerCount === 2);
const Waiting = createWrapper(
  GameContext,
  ctx => !ctx.isAdmin || ctx.playerCount < 3
);

export default function PlayerCountFeedbackCard() {
  return (
    <Card small inactive>
      <div className="flex flex-col items-center justify-end h-full space-y-3">
        <Waiting>
          <Spinner label="" className="text-theme-800 text-4xl" />
        </Waiting>
        <div className="text-theme-800 font-medium text-center text-lg">
          <TwoPlayersLeft>Waiting for 2 players...</TwoPlayersLeft>
          <OnePlayerLeft>Waiting for 1 player...</OnePlayerLeft>
          <EnoughPlayers>
            <span>All set!</span>
            <p className="text-md">Are you waiting for someone?</p>
          </EnoughPlayers>
        </div>
      </div>
    </Card>
  );
}
