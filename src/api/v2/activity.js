const ActivityController = require('../../controller/activity.controller');

module.exports = {
  name: 'activity-api-v2',
  version: '2.0.0',
  register: (server) => {
    server.route([
      {
        method: 'POST',
        path: '/',
        options: {
          auth: false,
          description: 'Create new activity',
          tags: ['api', 'Activity'],
        },
        handler: saveActivity,
      },
      {
        method: 'GET',
        path: '/',
        options: {
          auth: false,
          description: 'Get all activity',
          tags: ['api', 'Activity'],
        },
        handler: getActivity,
      },
      {
        method: 'PUT',
        path: '/',
        options: {
          auth: false,
          description: 'Update activity',
          tags: ['api', 'Activity'],
        },
        handler: updateActivity,
      },
    ]);
  },
};

const saveActivity = async (request, h) => {
  try {
    const activity = await ActivityController.saveActivity(request.payload);
    return h.response(activity);
  } catch (error) {
    return error;
  }
};

const getActivity = async (request, h) => {
  try {
    const activity = await ActivityController.getActivity();
    return h.response(activity);
  } catch (error) {
    return error;
  }
};

const updateActivity = async (request, h) => {
  try {
    const activity = await ActivityController.updateActivity(request.payload);
    return h.response(activity);
  } catch (error) {
    return error;
  }
};
