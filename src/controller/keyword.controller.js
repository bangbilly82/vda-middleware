const KeywordModel = require('../models/keyword/keyword.model');
const KeywordDB = require('../database/keyword_db');

const createKeyword = (payload) => {
  return new Promise((resolve, reject) => {
    KeywordModel.create({
      keywordName: payload.keywordName,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getAllKeyword = () => {
  return new Promise((resolve, reject) => {
    KeywordModel.find({})
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getKeywordByName = (keywordName) => {
  return new Promise((resolve, reject) => {
    KeywordModel.find({
      keywordName,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const updateKeyword = (payload) => {
  return new Promise((resolve, reject) => {
    KeywordModel.findByIdAndUpdate(payload.id, {
      keywordName: payload.keywordName,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteKeyword = (payload) => {
  return new Promise((resolve, reject) => {
    KeywordModel.findByIdAndDelete(payload.id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Migrated API to new DB

const saveKeyword = (payload) => {
  return new Promise((resolve, reject) => {
    KeywordDB.saveKeyword(payload)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getKeyword = () => {
  return new Promise((resolve, reject) => {
    KeywordDB.getKeyword()
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getKeywordByValueID = (value_id) => {
  return new Promise((resolve, reject) => {
    KeywordDB.getKeywordByValueID(value_id)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  createKeyword,
  getAllKeyword,
  getKeywordByName,
  updateKeyword,
  deleteKeyword,

  saveKeyword,
  getKeyword,
  getKeywordByValueID,
};
