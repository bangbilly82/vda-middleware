const Padawan = require('../services/padawan');
const JwtHelper = require('../authentication/jwtHelper');
const Config = require('../../config');

const getUserDetailById = ({ request, id }) => {
  return new Promise((resolve, reject) => {
    Padawan.getUserDetailById(id, request, (error, data) => {
      const payload = JSON.parse(data);
      if (error) {
        reject(error);
        return;
      }
      resolve(payload);
    });
  });
};

const createUserToken = ({ request }) => {
  return new Promise((resolve, reject) => {
    const payload = {
      username: request.payload.email,
      password: request.payload.password
    };
    const user = {
      ...Config.get('/stubAuthToken'),
      ...payload
    };
    const token = JwtHelper.sign(user);
    resolve(token);
  });
};

module.exports = {
  getUserDetailById,
  createUserToken
};
