const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  lng: {
    type: String,
    default: 'en',
    enum: ['en', 'he'],
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
  modified.forEach(([index, newValue]) => {
    existingCards[index] = newValue;
  });
  const map = new Map();
  existingCards.forEach((card, index) => {
    const key = 'current:' + index;
    map.set(key, card);
  });
  deleted.forEach(index => {
    const key = 'current:' + index;
    map.delete(key);
  });
  added.forEach((newCard, index), () => {
    const key = 'new:' + index;
    map.set(key, newCard);
  });

  let cards = [];
  for (const card in map.values()) {
    cards.push(card);
  }

  this[field] = cards;
};

Schema.statics.createGame = async function (questions, answers, lng = 'en') {
  const game = await this.create({
    questions,
    answers,
    lng,
  });
  return game;
};

Schema.statics.updateGame = async function (id, { questions, answers }) {
  const game = await this.findById(id);
  if (!game) throw new Error('game not found');
  if (questions) await game.setValues(questions, 'questions');
  if (answers) await game.setValues(answers, 'answers');
  await game.save();
  return game;
};

Schema.statics.deleteGame = async function (id) {
  await this.findByIdAndDelete(id);
};

const model = mongoose.model('Game', Schema);

module.exports = model;
