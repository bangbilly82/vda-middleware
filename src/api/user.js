const UserController = require('../controller/user.controller');

module.exports = {
  name: 'user-api',
  version: '1.0.0',
  register: (server) => {
    server.route([
      {
        method: 'POST',
        path: '/register',
        options: {
          auth: false,
          description: 'Register new user',
          tags: ['api', 'User'],
        },
        handler: registerUser,
      },
      {
        method: 'GET',
        path: '/get/all',
        options: {
          auth: false,
          description: 'Get all user',
          tags: ['api', 'User'],
        },
        handler: getAllUser,
      },
      {
        method: 'POST',
        path: '/login',
        options: {
          auth: false,
          description: 'Login user',
          tags: ['api', 'User'],
        },
        handler: loginUser,
      },
      {
        method: 'PUT',
        path: '/changedata',
        options: {
          auth: false,
          description: 'Forgot user password',
          tags: ['api', 'User'],
        },
        handler: forgotPassword,
      },
      {
        method: 'PUT',
        path: '/changepassword',
        options: {
          auth: false,
          description: 'Change user password',
          tags: ['api', 'User'],
        },
        handler: changePassword,
      },
      {
        method: 'POST',
        path: '/get/datauser',
        options: {
          auth: false,
          description: 'Get user by NIK',
          tags: ['api', 'User'],
        },
        handler: getUserByNik,
      },
      {
        method: 'DELETE',
        path: '/delete',
        options: {
          auth: false,
          description: 'Delete user by NIK',
          tags: ['api', 'User'],
        },
        handler: deleteUser,
      },
    ]);
  },
};

const forgotPassword = async (request, h) => {
  try {
    const users = await UserController.forgotPassword(request.payload);
    return h.response(users);
  } catch (error) {
    return error;
  }
};

const changePassword = async (request, h) => {
  try {
    const users = await UserController.changePassword(request.payload);
    return h.response(users);
  } catch (error) {
    return error;
  }
};

const getUserByNik = async (request, h) => {
  try {
    const user = await UserController.getUserByNik(request.payload.nik);
    return h.response(user);
  } catch (error) {
    return error;
  }
};

const deleteUser = async (request, h) => {
  try {
    const user = await UserController.deleteUser(request.payload.nik);
    return h.response(user);
  } catch (error) {
    return error;
  }
};

// Migrated API to new DB

const loginUser = async (request, h) => {
  try {
    // const users = await UserController.loginUser(request.payload);
    const users = await UserController.login(request.payload);
    return h.response(users);
  } catch (error) {
    return error;
  }
};

const registerUser = async (request, h) => {
  try {
    const payload = request.payload;
    // const register = await UserController.registerUser(payload);
    const register = await UserController.saveUser(payload);
    return h.response(register);
  } catch (error) {
    return error;
  }
};

const getAllUser = async (request, h) => {
  try {
    // const users = await UserController.getAllUser();
    const users = await UserController.getAllActiveUser();
    return h.response(users);
  } catch (error) {
    return error;
  }
};
