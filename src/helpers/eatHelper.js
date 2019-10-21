const Config = require('../../config');
const Padawan = require('../services/padawan');

const getAllFood = ({ request, id }) => {
  return new Promise((resolve, reject) => {
    Padawan.getAllFood(request, (error, data) => {
      const payload = JSON.parse(data);
      if (error) {
        reject(error);
        return;
      }
      resolve(payload);
    });
  });
};

const getFoodListSchedule = ({ request, id, food_id }) => {
  return new Promise((resolve, reject) => {
    Padawan.getFoodListSchedule(id, request, (error, data) => {
      let foods = [];
      const payload = JSON.parse(data);
      if (error) {
        reject(error);
        return;
      }
      payload.data.map(item => {
        foods.push(item.food_details);
      });
      const food = foods.filter(item => {
        return item.food_id.toString() === food_id;
      });
      resolve({
        code: 200,
        status: 'success',
        messages: ['Success - retrieve catering schedule for foodlist_id: 1'],
        data: food[0]
      });
    });
  });
};

const getFoodDetail = ({ request, id }) => {
  return new Promise((resolve, reject) => {
    Padawan.getFoodDetail(id, request, (error, data) => {
      const payload = JSON.parse(data);
      if (error) {
        reject(error);
        return;
      }
      resolve(payload);
    });
  });
};

module.exports = {
  getAllFood,
  getFoodListSchedule,
  getFoodDetail
};
