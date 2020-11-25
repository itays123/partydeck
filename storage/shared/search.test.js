require('../auth/user');
const Game = require('../game/game');
const { connect } = require('./mongoose');
const mongoose = require('mongoose');

before(() => {
  return connect();
});

/**
 * features:
 * - question and answer count
 * - returning populated author
 * - only public games
 */

// const user = mongoose.Types.ObjectId('5fb1150fb74fc136a89c2d1d');
const user = undefined;
const term = 'Untitled Partydeck';

const match = {
  $and: [
    {
      $text: { $search: term },
    },
    {
      $or: [{ isPrivate: false }, { $expr: { $eq: ['$author', user] } }],
    },
  ],
};

const project = {
  lng: 1,
  name: 1,
  isPrivate: 1,
  questionCount: { $size: '$questions' },
  answerCount: { $size: '$answers' },
  author: { $arrayElemAt: ['$author', 0] },
};

const lookup = {
  from: 'users',
  let: { id: '$author' },
  pipeline: [
    { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
    {
      $project: {
        _id: 1,
        name: 1,
      },
    },
  ],
  as: 'author',
};

describe('tests the searching functionality', () => {
  it('searches', async () => {
    return Game.aggregate([
      { $match: match },
      { $lookup: lookup },
      { $project: project },
    ]).then(res => console.log(res));
  });
});
