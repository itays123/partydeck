const { genSaltSync, hashSync } = require('bcrypt');

module.exports = async password => {
  const salt = genSaltSync(12);
  const hash = hashSync(password, salt);
  return hash;
};
