module.exports = {
  name: 'post auth-handler',
  version: '1.0.0',
  register: (server) => {
    server.ext({
      type: 'onPostAuth',
      method: function (request, h) {
        if (request.auth.credentials) {
          request.headers['x-access-token'] = request.auth.credentials.token;
          request.headers['x-refresh-token'] =
            request.auth.credentials.refreshToken;
        }
        return h.continue;
      },
    });
  },
};
