const TokenExtractor = require('./tokenExtractor');
const Boom = require('@hapi/boom');

const scheme = function(server, options) {
  return {
    authenticate: function(request, h) {
      const req = request.raw.req;
      const authorization = req.headers.authorization;
      if (!authorization) {
        throw Boom.unauthorized(null, 'No Authorization');
      }
      return h.authenticated({ credentials: { token: TokenExtractor(authorization) } });
    }
  };
};

module.exports = scheme;
