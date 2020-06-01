const DivisionModel = require('../models/division/division.model');
const DepartmentDB = require('../database/department_db');

const createDivision = (payload) => {
  return new Promise((resolve, reject) => {
    DivisionModel.create({
      division: payload.division,
      userIdHead: payload.userIdHead ? payload.userIdHead : null,
      divisionUserId: payload.divisionUserId ? payload.divisionUserId : null,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllDivision = () => {
  return new Promise((resolve, reject) => {
    DivisionModel.find()
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

const getDivision = (division) => {
  return new Promise((resolve, reject) => {
    DivisionModel.find({
      division,
    })
      .populate('divisionUserId')
      .populate('userIdHead')
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getDivisionByDivisionUserID = (divisionUserId) => {
  return new Promise((resolve, reject) => {
    DivisionModel.find({
      divisionUserId,
    })
      .populate('divisionUserId')
      .populate('userIdHead')
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getDivisionByHeadUserID = (userIdHead) => {
  return new Promise((resolve, reject) => {
    DivisionModel.find({
      userIdHead,
    })
      .populate('divisionUserId')
      .populate('userIdHead')
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const updateDivisionByID = (payload) => {
  return new Promise((resolve, reject) => {
    DivisionModel.findByIdAndUpdate(payload.id, {
      division: payload.division,
      userIdHead: payload.userIdHead ? payload.userIdHead : null,
      divisionUserId: payload.divisionUserId ? payload.divisionUserId : null,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteDivisionByID = (payload) => {
  return new Promise((resolve, reject) => {
    DivisionModel.findByIdAndDelete(payload.id)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Migrated API to new DB

const saveDepartment = (payload) => {
  return new Promise((resolve, reject) => {
    const { division, userIdHead, divisionUserId } = payload;
    const data = {
      division: division,
      userIdHead: userIdHead ? userIdHead : null,
      divisionUserId: divisionUserId ? divisionUserId : null,
    };
    DepartmentDB.saveDepartment(data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getDepartment = () => {
  return new Promise((resolve, reject) => {
    DepartmentDB.getDepartment()
      .then((result) => {
        const parseResponse = result.map((item) => {
          return {
            divisionUserId: null,
            userIdHead: null,
            _id: item.id,
            division: item.name,
          };
        });
        resolve(parseResponse);
      })
      .catch((error) => {
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
  deleteDivisionByID,

  saveDepartment,
  getDepartment,
};
