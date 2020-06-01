const ValueController = require('../../controller/value.controller');

module.exports = {
  name: 'value-api-v2',
  version: '2.0.0',
  register: (server) => {
    server.route([
      {
        method: 'POST',
        path: '/',
        options: {
          auth: false,
          description: 'Create new value',
          tags: ['api', 'Activity'],
        },
        handler: saveValue,
      },
      {
        method: 'GET',
        path: '/',
        options: {
          auth: false,
          description: 'Get value',
          tags: ['api', 'Activity'],
        },
        handler: getValue,
      },
    ]);
  },
};

const saveValue = async (request, h) => {
  try {
    const value = await ValueController.saveValue(request.payload);
    return h.response(value);
  } catch (error) {
    return error;
  }
};

const getValue = async (request, h) => {
  try {
    const value = await ValueController.getValue();
    return h.response(value);
  } catch (error) {
    return error;
  }
};
