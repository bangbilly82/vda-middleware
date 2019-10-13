const TokenExtractor = require('./tokenExtractor');
const Boom = require('@hapi/boom');
const JwtHelper = require('./jwtHelper');

const scheme = () => {
  return {
    authenticate: (request, h) => {
      let credentials;
      const req = request.raw.req;
      const authorization = req.headers.authorization;
      if (!authorization) {
        throw Boom.unauthorized('No Authorization');
      }
      const token = TokenExtractor(authorization);
      JwtHelper.verify(token, (err, payload) => {
        if (err) {
          throw Boom.unauthorized(err.message);
        }
        credentials = payload;
      });
      return h.authenticated({
        credentials: { token: credentials }
      });
    },
    validate: (decoded, request) => {
      const headers = request.headers;
      if (headers['channelid'] === 'FITCO') {
        return {
          isValid: true,
          credentials: { token: decoded }
        };
      }
      return { isValid: false };
    }
  };
};

module.exports = scheme;
