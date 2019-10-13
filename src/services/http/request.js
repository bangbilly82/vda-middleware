const request = require('request');

module.exports = (defaultRequest, method, defaultOptions, url, callback) => {
  const options = {
    method,
    url,
    channelid: defaultRequest.headers.channelid || 'FITCO',
    ...defaultOptions
  };
  request(options, (error, response, body) => {
    return callback(error, response, body);
  });
};
