const { compareSync } = require('bcrypt');

module.exports = async (password, hash) => {
  const result = compareSync(password, hash);
  if (result) return Promise.resolve();
  else throw new Error("passwords don't match");
};
