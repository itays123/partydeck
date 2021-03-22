require('../auth/user');
const Game = require('../game/game');
const { connect } = require('./mongoose');
const assert = require('assert');

before(() => {
  return connect();
});

/**
 * features:
 * - question and answer count
 * - returning populated author
 * - only public games
 * - limit
 * - offset
 */

describe('tests the searching functionality', () => {
  it('searches with method', async () => {
    return Game.search('Untitled Partydeck', 0, undefined).then(res => {
      assert.strictEqual(res.length, 1);
      assert.strictEqual(res[0].isPrivate, false);
      assert.strictEqual(res[0].questionCount, 5);
    });
  });

  it('searches with auth', async () => {
    return Game.search(
      'Untitled Partydeck',
      0,
      '5fb1150fb74fc136a89c2d1d'
    ).then(res => {
      assert.strictEqual(res.length, 2);
    });
  });

  it('searches with offset', async () => {
    return Game.search(
      'Untitled Partydeck',
      1,
      '5fb1150fb74fc136a89c2d1d'
    ).then(res => {
      assert.strictEqual(res.length, 1);
    });
  });
});
