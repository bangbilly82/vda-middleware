const Scheme = require('../authentication/guestAuthenticationScheme');

module.exports = {
  name: 'guest-authentication',
  version: '1.0.0',
  register: server => {
    server.auth.scheme('guestAuth', Scheme);
    server.auth.strategy('guestAuth', 'guestAuth');
  }
};
