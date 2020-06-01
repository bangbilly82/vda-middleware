const ActivityModel = require('../models/activity/activity.model');
const ActivityDB = require('../database/activity_db');

const createActivity = (payload) => {
  return new Promise((resolve, reject) => {
    ActivityModel.create({
      nameActivity: payload.nameActivity,
      dateActivity: new Date(),
      userInchargeId: payload.userInchargeId,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getActivityByName = (nameActivity) => {
  return new Promise((resolve, reject) => {
    ActivityModel.find({
      nameActivity,
    })
      .populate('userInchargeId')
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllActivity = () => {
  return new Promise((resolve, reject) => {
    ActivityModel.find({})
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getActivityByUserInchargeID = (userInchargeId) => {
  return new Promise((resolve, reject) => {
    ActivityModel.find({
      userInchargeId,
    })
      .populate('userInchargeId')
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// const updateActivity = (payload) => {
//   return new Promise((resolve, reject) => {
//     ActivityModel.findByIdAndUpdate(payload.id, {
//       nameActivity: payload.nameActivity,
//     })
//       .then((data) => {
//         resolve(data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

const deleteActivity = (payload) => {
  return new Promise((resolve, reject) => {
    ActivityModel.findByIdAndDelete(payload.id)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const saveActivity = (payload) => {
  return new Promise((resolve, reject) => {
    ActivityDB.saveActivity(payload)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getActivity = () => {
  return new Promise((resolve, reject) => {
    ActivityDB.getActivity()
      .then((result) => {
        const parseResponse = result.map((item) => {
          return {
            _id: item.id,
            nameActivity: item.name,
          };
        });
        resolve(parseResponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const updateActivity = (payload) => {
  return new Promise((resolve, reject) => {
    ActivityDB.updateActivity(payload)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  createActivity,
  getActivityByName,
  getAllActivity,
  getActivityByUserInchargeID,
  deleteActivity,

  saveActivity,
  getActivity,
  updateActivity,
};
