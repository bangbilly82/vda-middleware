const Jwt = require('jsonwebtoken');
const Config = require('../../config');

module.exports = {
  sign: user => {
    return Jwt.sign(user, Config.get('/secretKey'), {
      algorithm: 'HS256',
      expiresIn: '1h'
    });
  },
  verify: (token, callback) => {
    return Jwt.verify(
      token,
      Config.get('/secretKey'),
      {
        algorithm: ['HS256']
      },
      (err, payload) => {
        callback(err, payload);
      }
    );
  }
};
