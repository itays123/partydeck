const { SECURE } = require('../shared/consts');

module.exports = function () {
  let options = { httpOnly: true, sameSite: false };
  if (SECURE) options['secure'] = true;
  return options;
};
