const Scheme = require('../authentication/authenticationScheme');

module.exports = {
  name: 'authentication',
  version: '1.0.0',
  register: (server, options) => {
    server.auth.scheme('tokenScheme', Scheme);
    server.auth.strategy('default', 'tokenScheme');
  }
};
