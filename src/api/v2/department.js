const DivisionController = require('../../controller/division.controller');

module.exports = {
  name: 'department-api-v2',
  version: '2.0.0',
  register: (server) => {
    server.route([
      {
        method: 'POST',
        path: '/',
        options: {
          auth: false,
          description: 'Create new department',
          tags: ['api', 'Activity'],
        },
        handler: saveDepartment,
      },
      {
        method: 'GET',
        path: '/',
        options: {
          auth: false,
          description: 'Create new department',
          tags: ['api', 'Activity'],
        },
        handler: getDepartment,
      },
    ]);
  },
};

const saveDepartment = async (request, h) => {
  try {
    const activity = await DivisionController.saveDepartment(request.payload);
    return h.response(activity);
  } catch (error) {
    return error;
  }
};

const getDepartment = async (request, h) => {
  try {
    const activity = await DivisionController.getDepartment();
    return h.response(activity);
  } catch (error) {
    return error;
  }
};
