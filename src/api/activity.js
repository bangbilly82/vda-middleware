const ActivityController = require('../controller/activity.controller');

module.exports = {
  name: 'activity-api',
  version: '1.0.0',
  register: (server) => {
    server.route([
      {
        method: 'POST',
        path: '/post',
        options: {
          auth: false,
          description: 'Create new activity',
          tags: ['api', 'Activity'],
        },
        handler: createActivity,
      },
      {
        method: 'POST',
        path: '/get',
        options: {
          auth: false,
          description: 'Create new activity',
          tags: ['api', 'Activity'],
        },
        handler: getActivityByName,
      },
      {
        method: 'GET',
        path: '/get/all',
        options: {
          auth: false,
          description: 'Get all activity',
          tags: ['api', 'Activity'],
        },
        handler: getAllActivity,
      },
      {
        method: 'POST',
        path: '/get/getDataUserActivity',
        options: {
          auth: false,
          description: 'Get activity by user incharge ID',
          tags: ['api', 'Activity'],
        },
        handler: getActivityByUserInchargeID,
      },
      {
        method: 'PUT',
        path: '/put',
        options: {
          auth: false,
          description: 'Update activity',
          tags: ['api', 'Activity'],
        },
        handler: updateActivity,
      },
      {
        method: 'DELETE',
        path: '/delete',
        options: {
          auth: false,
          description: 'Delete activity',
          tags: ['api', 'Activity'],
        },
        handler: deleteActivity,
      },
    ]);
  },
};

const getActivityByName = async (request, h) => {
  try {
    const activity = await ActivityController.getActivityByName(
      request.payload.nameActivity
    );
    return h.response(activity);
  } catch (error) {
    return error;
  }
};

const getActivityByUserInchargeID = async (request, h) => {
  try {
    const activity = await ActivityController.getActivityByUserInchargeID(
      request.payload.userInchargeId
    );
    return h.response(activity);
  } catch (error) {
    return error;
  }
};

const deleteActivity = async (request, h) => {
  try {
    const activity = await ActivityController.deleteActivity(request.payload);
    return h.response(activity);
  } catch (error) {
    return error;
  }
};

// Migrated API to new DB

const createActivity = async (request, h) => {
  try {
    // const activity = await ActivityController.createActivity(request.payload);
    const activity = await ActivityController.saveActivity(request.payload);
    return h.response(activity);
  } catch (error) {
    return error;
  }
};

const getAllActivity = async (request, h) => {
  try {
    // const activity = await ActivityController.getAllActivity();
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
