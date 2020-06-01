const ValueModel = require('../models/value/value.model');
const ValueDB = require('../database/value_db');
const KeywordDB = require('../database/keyword_db');
const _ = require('lodash');

const createValue = (payload) => {
  return new Promise((resolve, reject) => {
    ValueModel.create({
      valueName: payload.valueName,
      keywordsId: payload.keywordsId,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getAllValue = () => {
  return new Promise((resolve, reject) => {
    ValueModel.find({})
      .populate('keywordsId')
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const updateValue = (payload) => {
  return new Promise((resolve, reject) => {
    ValueModel.findByIdAndUpdate(payload.id, {
      ValueName: payload.keywordName,
      keywordsId: payload.keywords,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteValue = (payload) => {
  return new Promise((resolve, reject) => {
    ValueModel.findByIdAndDelete(payload.id)
      .then((data) => {
        resolve('data has been');
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Migrated API to new DB

const saveValue = (payload) => {
  return new Promise((resolve, reject) => {
    ValueDB.saveValue(payload)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getValue = () => {
  return new Promise((resolve, reject) => {
    ValueDB.getValue()
      .then((result) => {
        const parseResponse = _.groupBy(result, (item) => {
          return item.name;
        });
        const keys = Object.keys(parseResponse);
        const test = keys.map((item) => {
          return {
            id: parseResponse[item][0].id,
            valueName: parseResponse[item][0].name,
            keywordsId: parseResponse[item].map((obj) => {
              return {
                _id: obj.keyword_id,
                keywordName: obj.keyword,
              };
            }),
          };
        });
        resolve(test);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  createValue,
  getAllValue,
  updateValue,
  deleteValue,

  saveValue,
  getValue,
};
