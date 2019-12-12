const _ = require('lodash');
const Padawan = require('../services/padawan');
const JwtHelper = require('../authentication/jwtHelper');
const Config = require('../../config');
const Fitmart = require('../services/fitmart');

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

const getAllCustomers = () => {
  return new Promise((resolve, reject) => {
    Fitmart.getAllCustomers().then(response => {
      resolve(response);
    });
  });
};

const getAllCustomersByEmail = email => {
  return new Promise((resolve, reject) => {
    Fitmart.getCustomerByEmail(email).then(response => {
      resolve(response);
    });
  });
};

const createNewCustomer = data => {
  return new Promise((resolve, reject) => {
    Fitmart.createNewCustomer(data).then(response => {
      resolve(response);
    });
  });
};

module.exports = {
  getUserDetailById,
  createUserToken,
  getAllCustomers,
  getAllCustomersByEmail,
  createNewCustomer
};
