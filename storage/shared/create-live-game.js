const fetch = require('node-fetch');
const { SERVER_URL } = require('./consts');

/**
 * fetches the create-game command
 * @param {[string[], string[]]} playable
 */
module.exports = async function (playable) {
  const body = JSON.stringify({ playable });
  const url = `${SERVER_URL}/create`;
  const res = await fetch(url, { method: 'POST', body });
  const data = await res.json();
  console.log(res.status, data);
  return { status: res.status, gameCode: data.code };
};
