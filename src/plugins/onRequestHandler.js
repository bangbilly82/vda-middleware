module.exports = {
  name: 'on-request-handler',
  version: '1.0.0',
  register: (server) => {
    server.ext({
      type: 'onRequest',
      method: function (request, h) {
        console.log(request.path, 'on request handler');
        return h.continue;
      },
    });
  },
};
