const { compareSync } = require('bcrypt');
const mongoose = require('mongoose');
const createHash = require('./create-hash');
const generateJwt = require('./generate-jwt');

const Schema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Anonymous',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

Schema.methods.compare = async function (password) {
  const result = compareSync(password, this.password);
  if (result) return Promise.resolve();
  else throw new Error("passwords don't match");
};

Schema.statics.checkEmailUsed = async function (email) {
  const user = await this.findOne({ email });
  if (user) throw new Error('user exists!');
  return Promise.resolve();
};

Schema.statics.basicLogin = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error();
  await user.compare(password);
  const token = generateJwt(user._id);
  return token;
};

Schema.statics.register = async function (email, pw, name = undefined) {
  console.log('signing up...');
  const password = await createHash(pw);
  const user = await this.create({ email, password, name });
  const token = generateJwt(user._id);
  return token;
};

const model = mongoose.model('User', Schema);

module.exports = model;
