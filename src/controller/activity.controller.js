const ActivityModel = require('../models/activity/activity.model');

const createActivity = payload => {
  return new Promise((resolve, reject) => {
    ActivityModel.create({
      nameActivity: payload.nameActivity,
      dateActivity: new Date(),
      userInchargeId: payload.userInchargeId
    })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getActivityByName = nameActivity => {
  return new Promise((resolve, reject) => {
    ActivityModel.find({
      nameActivity
    })
      .populate('userInchargeId')
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getAllActivity = () => {
  return new Promise((resolve, reject) => {
    ActivityModel.find({})
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getActivityByUserInchargeID = userInchargeId => {
  return new Promise((resolve, reject) => {
    ActivityModel.find({
      userInchargeId
    })
      .populate('userInchargeId')
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const updateActivity = payload => {
  return new Promise((resolve, reject) => {
    ActivityModel.findByIdAndUpdate(payload.id, {
      nameActivity: payload.nameActivity
    })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const deleteActivity = payload => {
  return new Promise((resolve, reject) => {
    ActivityModel.findByIdAndDelete(payload.id)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  createActivity,
  getActivityByName,
  getAllActivity,
  getActivityByUserInchargeID,
  updateActivity,
  deleteActivity
};
