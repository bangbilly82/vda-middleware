const KeywordModel = require('../models/keyword/keyword.model');

const createKeyword = payload => {
  return new Promise((resolve, reject) => {
    KeywordModel.create({
      keywordName: payload.keywordName
    })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getAllKeyword = () => {
  return new Promise((resolve, reject) => {
    KeywordModel.find({})
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getKeywordByName = keywordName => {
  return new Promise((resolve, reject) => {
    KeywordModel.find({
      keywordName
    })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const updateKeyword = payload => {
  return new Promise((resolve, reject) => {
    KeywordModel.findByIdAndUpdate(payload.id, {
      keywordName: payload.keywordName
    })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const deleteKeyword = payload => {
  return new Promise((resolve, reject) => {
    KeywordModel.findByIdAndDelete(payload.id)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = {
  createKeyword,
  getAllKeyword,
  getKeywordByName,
  updateKeyword,
  deleteKeyword
};
