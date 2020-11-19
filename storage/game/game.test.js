const mongoose = require('mongoose');
require('../auth/user');
const Game = require('./game');
const { connect } = require('../shared/mongoose');
const assert = require('assert');

const test_questions = ['q1', 'q2', 'q3'];
const test_answers = [
  'a1',
  'a2',
  'a3',
  'a4',
  'a5',
  'a6',
  'a7',
  'a8',
  'a9',
  'a10',
  'a11',
  'a12',
];

before(() => {
  return connect().then(() => {
    mongoose.connection.db.collection('Games').drop();
  });
});

describe('tests the game schema', () => {
  let gameId;
  it('creates a game', done => {
    Game.createGame(
      test_questions,
      test_answers,
      '5fb1150fb74fc136a89c2d1d'
    ).then(game => {
      gameId = game._id;
      console.log(game._id);
      done();
    });
  });

  it('gets a game', () => {
    return Game.getGame(gameId).then(game => {
      assert.strictEqual(game.author.name, 'Itay Schechner');
    });
  });

  it('updates a game', () => {
    return Game.updateGame(gameId, {
      questions: {
        added: ['q4', 'q5'],
        modified: [
          [0, 'q0'],
          [1, 'q1'],
        ],
      },
      answers: {
        added: ['a13', 'a14', 'a15'],
        deleted: [0, 1, 2],
      },
    }).then(game => {
      assert.strictEqual(game.questions.length, 5);
      assert.strictEqual(game.questions[0], 'q0');
      assert.strictEqual(game.questions[1], 'q1');
      assert.strictEqual(game.answers.length, 12);
      assert.strictEqual(game.answers[0], 'a4');
    });
  });

  it('deletes a game', done => {
    Game.deleteGame(gameId).then(done);
  });
});
