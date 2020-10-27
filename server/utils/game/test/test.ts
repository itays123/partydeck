import { Game } from '../Game.ts';
import testRound from './testRound.ts';

const game = new Game<string>(
  [
    'question1',
    'question2',
    'question3',
    'question4',
    'question5',
    'question6',
  ],
  testRound
);

game.addPlayer('player1');
game.addPlayer('player2');
game.addPlayer('player3');
game.start();
