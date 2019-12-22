const ValueModel = require('../models/value/value.model');

const createValue = payload => {
  return new Promise((resolve, reject) => {
    ValueModel.create({
      valueName: payload.valueName,
      keywordsId: payload.keywordsId
    })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getAllValue = () => {
  return new Promise((resolve, reject) => {
    ValueModel.find({})
      .populate('keywordsId')
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const updateValue = payload => {
  return new Promise((resolve, reject) => {
    ValueModel.findByIdAndUpdate(payload.id, {
      ValueName: payload.keywordName,
      keywordsId: payload.keywords
    })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const deleteValue = payload => {
  return new Promise((resolve, reject) => {
    ValueModel.findByIdAndDelete(payload.id)
      .then(data => {
        resolve('data has been');
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = {
  createValue,
  getAllValue,
  updateValue,
  deleteValue
};
