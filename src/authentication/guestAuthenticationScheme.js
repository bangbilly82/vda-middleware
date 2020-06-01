const Boom = require('boom');

const scheme = () => {
  return {
    authenticate: (request, h) => {
      // Check if request header contain special custom header object
      const authorization = request.headers['x-custom-guest-authentication'];
      if (!authorization) {
        throw Boom.unauthorized();
      }
      return h.authenticated({ credentials: { is_guest: true } });
    }
  };
};

module.exports = scheme;
