const Logger = require('pino')({
  prettyPrint: true
});
const Boom = require('boom');
const Request = require('../services/http/request');
const Config = require('../../config');

const endpointRoute = {
  'point-booster-all-merchant': '/point-booster/list/merchant',
  'user-detail': '/v2/user/details/',
  'user-login': '/user/login',
  'food-list': '/eat/foodlist',
  'food-list-schedule': '/eat/catering-schedule/foodlist/',
  'food-detail': '/eat/food/details/'
};

const defaultHeaders = {
  Authorization: 'Bearer ' + Config.get('/bearerToken'),
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const defaultOptions = {
  headers: defaultHeaders
};

const getBaseUrl = endpoint => {
  return Config.get('/padawanApi') + endpointRoute[endpoint];
};

const parseResponse = (error, response, body, callback) => {
  if (error) {
    throw callback(error, body);
  }

  if (response && response.statusCode == 200) {
    callback(null, body);
  }

  if (response && response.statusCode == 401) {
    callback(Boom.unauthorized('PADAWAN API Unauthorized'), body);
  }

  if (
    (response && response.statusCode == 400) ||
    (response && response.statusCode == 500)
  ) {
    callback(Boom.badRequest(), body);
  }
};

const callAPI = (request, method, url, callback) => {
  Logger.info(`[PADAWAN API] Established ${method} connection to`, url);
  Request(request, method, defaultOptions, url, (error, response, body) => {
    parseResponse(error, response, body, callback);
  });
};

const getAllPointBoosterMerchant = (request, callback) => {
  callAPI(request, 'GET', getBaseUrl('point-booster-all-merchant'), {}, callback);
};

const getUserDetailById = (id, request, callback) => {
  callAPI(request, 'GET', getBaseUrl('user-detail') + id, {}, callback);
};

const loginUser = (request, callback) => {
  const body = {
    data: {
      username: request.payload.data.username,
      password: request.payload.data.password
    }
  };
  const payload = {
    body: JSON.stringify(body)
  };
  callAPI(request, 'POST', getBaseUrl('user-login'), payload, callback);
};

const getAllFood = (request, callback) => {
  callAPI(request, 'GET', getBaseUrl('food-list'), {}, callback);
};

const getFoodListSchedule = (id, request, callback) => {
  callAPI(request, 'GET', getBaseUrl('food-list-schedule') + id, {}, callback);
};

const getFoodDetail = (id, request, callback) => {
  callAPI(request, 'GET', getBaseUrl('food-detail') + id, {}, callback);
};

module.exports = {
  getAllPointBoosterMerchant,
  getUserDetailById,
  loginUser,
  getAllFood,
  getFoodListSchedule,
  getFoodDetail
};
