const Scheme = require('../authentication/authenticationScheme');
const Config = require('../../config');

module.exports = {
  name: 'authentication',
  version: '1.0.0',
  register: server => {
    server.auth.strategy('jwt', 'jwt', {
      key: Config.get('/secretKey'),
      validate: Scheme().validate,
      verifyOptions: {
        ignoreExpiration: false,
        algorithm: ['HS256'],
        issuer: ['fitco-app']
      }
    });
    server.auth.default('jwt');
  }
};
