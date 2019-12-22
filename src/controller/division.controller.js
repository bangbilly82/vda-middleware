const DivisionModel = require('../models/division/division.model');

const createDivision = payload => {
  return new Promise((resolve, reject) => {
    DivisionModel.create({
      division: payload.division,
      userIdHead: payload.userIdHead ? payload.userIdHead : null,
      divisionUserId: payload.divisionUserId ? payload.divisionUserId : null
    })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getAllDivision = () => {
  return new Promise((resolve, reject) => {
    DivisionModel.find()
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

const getDivision = division => {
  return new Promise((resolve, reject) => {
    DivisionModel.find({
      division
    })
      .populate('divisionUserId')
      .populate('userIdHead')
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getDivisionByDivisionUserID = divisionUserId => {
  return new Promise((resolve, reject) => {
    DivisionModel.find({
      divisionUserId
    })
      .populate('divisionUserId')
      .populate('userIdHead')
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getDivisionByHeadUserID = userIdHead => {
  return new Promise((resolve, reject) => {
    DivisionModel.find({
      userIdHead
    })
      .populate('divisionUserId')
      .populate('userIdHead')
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const updateDivisionByID = payload => {
  return new Promise((resolve, reject) => {
    DivisionModel.findByIdAndUpdate(payload.id, {
      division: payload.division,
      userIdHead: payload.userIdHead ? payload.userIdHead : null,
      divisionUserId: payload.divisionUserId ? payload.divisionUserId : null
    })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const deleteDivisionByID = payload => {
  return new Promise((resolve, reject) => {
    DivisionModel.findByIdAndDelete(payload.id)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  getAllDivision,
  createDivision,
  getDivision,
  getDivisionByDivisionUserID,
  getDivisionByHeadUserID,
  updateDivisionByID,
  deleteDivisionByID
};
