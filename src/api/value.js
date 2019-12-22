const ValueController = require('../controller/value.controller');

module.exports = {
  name: 'value-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'POST',
        path: '/post',
        options: {
          auth: false,
          description: 'Create new value',
          tags: ['api', 'Value']
        },
        handler: createValue
      },
      {
        method: 'GET',
        path: '/get/all',
        options: {
          auth: false,
          description: 'Get all value',
          tags: ['api', 'Value']
        },
        handler: getAllValue
      },
      {
        method: 'PUT',
        path: '/put',
        options: {
          auth: false,
          description: 'Update value',
          tags: ['api', 'Value']
        },
        handler: updateValue
      },
      {
        method: 'DELETE',
        path: '/delete',
        options: {
          auth: false,
          description: 'Delete value',
          tags: ['api', 'Value']
        },
        handler: deleteValue
      }
    ]);
  }
};

const createValue = async (request, h) => {
  try {
    const value = await ValueController.createValue(request.payload);
    return h.response(value);
  } catch (error) {
    return error;
  }
};

const getAllValue = async (request, h) => {
  try {
    const value = await ValueController.getAllValue();
    return h.response(value);
  } catch (error) {
    return error;
  }
};

const updateValue = async (request, h) => {
  try {
    const value = await ValueController.updateValue(request.payload);
    return h.response(value);
  } catch (error) {
    return error;
  }
};

const deleteValue = async (request, h) => {
  try {
    const value = await ValueController.deleteValue(request.payload);
    return h.response(value);
  } catch (error) {
    return error;
  }
};
