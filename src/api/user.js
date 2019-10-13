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
