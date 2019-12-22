const RatingController = require('../controller/rating.controller');

module.exports = {
  name: 'rating-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'POST',
        path: '/post',
        options: {
          auth: false,
          description: 'Create new rating',
          tags: ['api', 'Rating']
        },
        handler: createRating
      },
      {
        method: 'PUT',
        path: '/put',
        options: {
          auth: false,
          description: 'Update rating',
          tags: ['api', 'Rating']
        },
        handler: updateRating
      },
      {
        method: 'DELETE',
        path: '/delete',
        options: {
          auth: false,
          description: 'Delete rating',
          tags: ['api', 'Rating']
        },
        handler: deleteRating
      },
      {
        method: 'POST',
        path: '/get',
        options: {
          auth: false,
          description: 'Get rating by user gift ID',
          tags: ['api', 'Rating']
        },
        handler: getUserByUserGiftID
      },
      {
        method: 'POST',
        path: '/get/dinilai',
        options: {
          auth: false,
          description: 'Get rating by user get ID',
          tags: ['api', 'Rating']
        },
        handler: getUserByUserGetID
      }
    ]);
  }
};

const createRating = async (request, h) => {
  try {
    const rating = await RatingController.createRating(request.payload);
    return h.response(rating);
  } catch (error) {
    return error;
  }
};

const updateRating = async (request, h) => {
  try {
    const rating = await RatingController.updateRating(request.payload);
    return h.response(rating);
  } catch (error) {
    return error;
  }
};

const deleteRating = async (request, h) => {
  try {
    const rating = await RatingController.deleteRating(request.payload);
    return h.response(rating);
  } catch (error) {
    return error;
  }
};

const getUserByUserGiftID = async (request, h) => {
  try {
    const rating = await RatingController.getUserByUserGiftID(request.payload.userGiftId);
    return h.response(rating);
  } catch (error) {
    return error;
  }
};

const getUserByUserGetID = async (request, h) => {
  try {
    const rating = await RatingController.getUserByUserGetID(request.payload.userGetId);
    return h.response(rating);
  } catch (error) {
    return error;
  }
};
