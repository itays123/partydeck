const mongoose = require('mongoose');
const { MONGO_URI } = require('./consts');

module.exports.connect = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    return Promise.resolve();
  } catch (err) {
    process.exit(-1);
  }
};
