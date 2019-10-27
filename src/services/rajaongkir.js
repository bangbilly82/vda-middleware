const Logger = require('pino')({
  prettyPrint: true
});
const Boom = require('boom');
const QueryString = require('query-string');
const Request = require('../services/http/request');
const Config = require('../../config');

const endpointRoute = {
  province: '/province',
  city: '/city',
  cost: '/cost'
};

const defaultHeaders = {
  key: Config.get('/rajaOngkir').apiKey,
  'content-type': 'application/x-www-form-urlencoded'
};

const defaultOptions = {
  headers: defaultHeaders
};

const getBaseUrl = endpoint => {
  return Config.get('/rajaOngkir').host + endpointRoute[endpoint];
};

const parseResponse = (error, response, body, callback) => {
  if (error) {
    throw callback(error, body);
  }

  if (response && response.statusCode == 200) {
    callback(null, body);
  }

  if (response && response.statusCode == 401) {
    callback(Boom.unauthorized('RAJA ONGKIR API Unauthorized'), body);
  }

  if (
    (response && response.statusCode == 400) ||
    (response && response.statusCode == 500)
  ) {
    callback(Boom.badRequest(), body);
  }
};

const callAPI = (request, method, url, options, callback) => {
  Logger.info(`[RAJA ONGKIR API] Established ${method} connection to`, url);
  const extendedOptions = options
    ? { ...defaultOptions, ...options }
    : defaultOptions;
  Request(request, method, extendedOptions, url, (error, response, body) => {
    parseResponse(error, response, body, callback);
  });
};

const getAllProvince = (request, callback) => {
  const query = QueryString.stringify(request.query);
  const baseUrl = getBaseUrl('province') + (query ? `?${query}` : '');
  callAPI(request, 'GET', baseUrl, {}, callback);
};

const getAllCity = (request, callback) => {
  const query = QueryString.stringify(request.query);
  const baseUrl = getBaseUrl('city') + (query ? `?${query}` : '');
  callAPI(request, 'GET', baseUrl, {}, callback);
};

const getCost = (request, callback) => {
  const body = {
    origin: request.payload.origin,
    destination: request.payload.destination,
    weight: request.payload.weight,
    courier: request.payload.courier
  };
  const payload = {
    form: body
  };
  callAPI(request, 'POST', getBaseUrl('cost'), payload, callback);
};

module.exports = {
  getAllProvince,
  getAllCity,
  getCost
};
