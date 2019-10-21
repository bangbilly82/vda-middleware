const EatHelper = require('../helpers/EatHelper');

module.exports = {
  name: 'eat-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'GET',
        path: '/food/details/{food_id}',
        options: {
          auth: 'guestAuth',
          description: 'Get food details',
          tags: ['api', 'Eat']
        },
        handler: getFoodDetails
      },
    ]);
  }
};

const getFoodDetails = async (request, h) => {
  try {
    const food_id = request.params.food_id;
    const food = await EatHelper.getFoodDetail({ request, id: food_id });
    return h.response(food);
  } catch (error) {
    return error;
  }
};
