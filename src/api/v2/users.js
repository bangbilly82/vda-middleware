const UserController = require('../../controller/user.controller');

module.exports = {
  name: 'user-api-v2',
  version: '2.0.0',
  register: (server) => {
    server.route([
      {
        method: 'GET',
        path: '/',
        options: {
          auth: false,
          description: 'Get all user',
          tags: ['api', 'User'],
        },
        handler: getAllUser,
      },
    ]);
  },
};

const getAllUser = async (request, h) => {
  try {
    const users = await UserController.getAllActiveUser();
    return h.response(users);
  } catch (error) {
    return error;
  }
};
