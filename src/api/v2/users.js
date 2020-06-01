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
      {
        method: 'GET',
        path: '/{id}',
        options: {
          auth: 'guestAuth',
          description: 'Get all user',
          tags: ['api', 'User'],
        },
        handler: getUserByID,
      },
      {
        method: 'POST',
        path: '/register',
        options: {
          auth: false,
          description: 'Register new user',
          tags: ['api', 'User'],
        },
        handler: saveUser,
      },
      {
        method: 'POST',
        path: '/login',
        options: {
          auth: false,
          description: 'Login user',
          tags: ['api', 'User'],
        },
        handler: login,
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

const getUserByID = async (request, h) => {
  try {
    const { id } = request.params;
    const users = await UserController.getUserByID(id);
    return h.response(users);
  } catch (error) {
    return error;
  }
};

const saveUser = async (request, h) => {
  try {
    const users = await UserController.saveUser(request.payload);
    return h.response(users);
  } catch (error) {
    return error;
  }
};

const login = async (request, h) => {
  try {
    const users = await UserController.login(request.payload);
    return h.response(users);
  } catch (error) {
    return error;
  }
};
