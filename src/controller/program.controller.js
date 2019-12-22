const ProgramModel = require('../models/program/program.model');

const createProgram = payload => {
  return new Promise((resolve, reject) => {
    ProgramModel.create({
      nameProgram: payload.nameProgram,
      dateProgram: new Date(),
      userInchargeId: payload.userInchargeId,
      actvityId: payload.actvityId
    })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getAllProgram = () => {
  return new Promise((resolve, reject) => {
    ProgramModel.find({})
      .populate({ path: 'userInchargeId', populate: { path: 'division' } })
      .populate({ path: 'actvityId.nameActivity' })
      .populate({
        path: 'actvityId.valueChoice.nameValue',
        populate: { path: 'keywordsId' }
      })
      .populate('actvityId.valueChoice.choiceKeyword')
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getProgramByName = nameProgram => {
  return new Promise((resolve, reject) => {
    ProgramModel.find({
      nameProgram
    })
      .populate({ path: 'userInchargeId', populate: { path: 'division' } })
      .populate({ path: 'actvityId.nameActivity' })
      .populate('actvityId.valueChoice.nameValue', '-keywordsId')
      .populate('actvityId.valueChoice.choiceKeyword')
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getProgramByUserInchargeID = userInchargeId => {
  return new Promise((resolve, reject) => {
    ProgramModel.find({
      userInchargeId
    })
      .populate({ path: 'userInchargeId', populate: { path: 'division' } })
      .populate({ path: 'actvityId.nameActivity' })
      .populate({
        path: 'actvityId.valueChoice.nameValue',
        populate: { path: 'keywordsId' }
      })
      .populate('actvityId.valueChoice.choiceKeyword')
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const updateProgram = payload => {
  return new Promise((resolve, reject) => {
    ProgramModel.findOneAndUpdate(
      { _id: payload.id },
      {
        nameProgram: payload.nameProgram
      }
    )
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const deleteProgram = payload => {
  return new Promise((resolve, reject) => {
    ProgramModel.findByIdAndDelete(payload.id)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  createProgram,
  getAllProgram,
  getProgramByName,
  getProgramByUserInchargeID,
  updateProgram,
  deleteProgram
};
