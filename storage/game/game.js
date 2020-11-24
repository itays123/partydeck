const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Schema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Untilted Partydeck',
  },
  lng: {
    type: String,
    default: 'en',
  },
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  questions: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.length >= 3;
      },
      message: 'Too short game!',
    },
  },
  answers: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.length >= 12;
      },
      message: 'You need more questions!',
    },
  },
});

/**
 * an O(n) algorithm to set values of a field
 * @param {{ added: string[], modified: [number, string][], deleted: [number] }} changes
 * @param {'questions'|'answers'} field
 */
Schema.methods.setValues = async function (
  { added, modified, deleted },
  field
) {
  const existingCards = this[field];
  if (modified) {
    modified.forEach(([index, newValue]) => {
      existingCards[index] = newValue;
    });
  }
  const map = new Map();
  existingCards.forEach((card, index) => {
    const key = 'current:' + index;
    map.set(key, card);
  });
  if (deleted) {
    deleted.forEach(index => {
      const key = 'current:' + index;
      map.delete(key);
    });
  }
  if (added) {
    added.forEach((newCard, index) => {
      const key = 'new:' + index;
      map.set(key, newCard);
    });
  }
  let cards = [];
  for (const card of map.values()) {
    cards.push(card);
  }

  this[field] = cards;
};

Schema.statics.createGame = async function (
  questions,
  answers,
  author,
  name = 'Untilted Partydeck',
  lng = 'en',
  isPrivate = false
) {
  const game = await this.create({
    questions,
    answers,
    author,
    name,
    lng,
    isPrivate,
  });
  return game;
};

Schema.statics.updateGame = async function (
  id,
  { questions, answers, isPrivate }
) {
  const game = await this.findById(id);
  if (!game) throw new Error('game not found');
  if (questions) await game.setValues(questions, 'questions');
  if (answers) await game.setValues(answers, 'answers');
  if (isPrivate === false || isPrivate === true) game.isPrivate = isPrivate;
  await game.save();
  return game;
};

Schema.statics.deleteGame = async function (id) {
  await this.findByIdAndDelete(id);
};

Schema.statics.getGame = async function (id, uid = undefined) {
  const game = await this.findOne({ _id: id }).populate('author', 'name');
  if (game.isPrivate && game.author._id != uid) return null;
  return game;
};

Schema.statics.getPlayableGame = async function (id) {
  // this function sends the relevant data to the live server
  const game = await this.findById(id).select('questions answers');
  if (!game) return null;
  else return [game.questions, game.answers];
};

Schema.statics.getUserGames = async function (uid) {
  const games = await this.aggregate([
    {
      $match: { author: ObjectId(uid) },
    },
    {
      $project: {
        lng: 1,
        name: 1,
        isPrivate: 1,
        questionCount: { $size: '$questions' },
        answerCount: { $size: '$answers' },
      },
    },
  ]);
  return games;
};

const model = mongoose.model('Game', Schema);

module.exports = model;
