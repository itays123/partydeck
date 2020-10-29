import { Game } from '../Game.ts';
import { TestPlayer } from './testPlayer.ts';
import testRound from './testRound.ts';

const game = new Game<TestPlayer>([
  'question1',
  'question2',
  'question3',
  'question4',
  'question5',
  'question6',
]);

game.on('round', testRound);

game.addPlayer(new TestPlayer('player1'));
game.addPlayer(new TestPlayer('player2'));
game.addPlayer(new TestPlayer('player3'));
game.start();
