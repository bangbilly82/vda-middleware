const Joi = require('joi');
const UserHelper = require('../helpers/userHelper');

module.exports = {
  name: 'user-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'GET',
        path: '/id/{user_id}',
        options: {
          auth: 'jwt',
          description: 'Get user by id',
          tags: ['api', 'User'],
          validate: {
            params: {
              user_id: Joi.string().required()
            }
          }
        },
        handler: getUserById
      },
      {
        method: 'POST',
        path: '/create/token',
        options: {
          auth: false,
          description: 'Create user token',
          tags: ['api', 'User'],
          validate: {
            payload: {
              email: Joi.string().email().required(),
              password: Joi.string().required()
            }
          }
        },
        handler: createUserToken
      },
      {
        method: 'GET',
        path: '/customers',
        options: {
          auth: false,
          description: 'Create new customer',
          tags: ['api', 'User']
        },
        handler: getAllCustomers
      }
    ]);
  }
};

const getUserById = async (request, h) => {
  try {
    const user_id = request.params.user_id;
    const user = await UserHelper.getUserDetailById({ request, id: user_id });
    return h.response(user);
  } catch (error) {
    return error;
  }
};

const createUserToken = async (request, h) => {
  try {
    const token = await UserHelper.createUserToken({ request });
    return h.response(token);
  } catch (error) {
    return error;
  }
};

const getAllCustomers = async (request, h) => {
  try {
    const customers = await UserHelper.getAllCustomers();
    return h.response(customers);
  } catch (error) {
    return error;
  }
};
