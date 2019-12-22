const RatingModel = require('../models/rating/rating.model');

const createRating = payload => {
  return new Promise((resolve, reject) => {
    RatingModel.create({
      userGetId: payload.userGetId,
      userGiftId: payload.userGiftId,
      rating: payload.rating,
      dateRating: new Date(),
      status: false
    })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const updateRating = payload => {
  return new Promise((resolve, reject) => {
    RatingModel.findByIdAndUpdate(payload.id, {
      rating: payload.rating
    })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const deleteRating = payload => {
  return new Promise((resolve, reject) => {
    RatingModel.findByIdAndDelete(payload.id)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getUserByUserGiftID = userGiftId => {
  return new Promise((resolve, reject) => {
    RatingModel.find({
      userGiftId
    })
      .populate('userGiftId')
      .populate('userGetId')
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getUserByUserGetID = userGetId => {
  return new Promise((resolve, reject) => {
    RatingModel.find({
      userGetId
    })
      .populate('userGetId')
      .populate('userGiftId')
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  createRating,
  updateRating,
  deleteRating,
  getUserByUserGiftID,
  getUserByUserGetID
};
