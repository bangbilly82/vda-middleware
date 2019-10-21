const EatHelper = require('../helpers/EatHelper');

module.exports = {
  name: 'eat-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'GET',
        path: '/foodlist',
        options: {
          auth: 'guestAuth',
          description: 'Get all food',
          tags: ['api', 'Eat']
        },
        handler: fetchAllFood
      },
      {
        method: 'GET',
        path: '/foodlist/{foodlist_id}/{food_id}',
        options: {
          auth: 'guestAuth',
          description: 'Get all food',
          tags: ['api', 'Eat']
        },
        handler: getFoodListSchedule
      },
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

const fetchAllFood = async (request, h) => {
  try {
    const foodList = await EatHelper.getAllFood({ request });
    return h.response(foodList);
  } catch (error) {
    return error;
  }
};

const getFoodListSchedule = async (request, h) => {
  try {
    const id = request.params.foodlist_id;
    const food_id = request.params.food_id;
    const foodList = await EatHelper.getFoodListSchedule({ request, id, food_id });
    return h.response(foodList);
  } catch (error) {
    return error;
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
