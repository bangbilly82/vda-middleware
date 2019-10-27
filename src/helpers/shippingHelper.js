const RajaOngkir = require('../services/rajaongkir');

const getAllShippingProvince = ({ request }) => {
  return new Promise((resolve, reject) => {
    RajaOngkir.getAllProvince(request, (error, data) => {
      const payload = JSON.parse(data);
      if (error) {
        reject(error);
        return;
      }
      resolve(payload);
    });
  });
};

const getAllShippingCity = ({ request }) => {
  return new Promise((resolve, reject) => {
    RajaOngkir.getAllCity(request, (error, data) => {
      const payload = JSON.parse(data);
      if (error) {
        reject(error);
        return;
      }
      resolve(payload);
    });
  });
};

const getCost = ({ request }) => {
  return new Promise((resolve, reject) => {
    RajaOngkir.getCost(request, (error, data) => {
      const payload = JSON.parse(data);
      if (error) {
        reject(error);
        return;
      }
      resolve(payload);
    });
  });
};

module.exports = {
  getAllShippingProvince,
  getAllShippingCity,
  getCost
};
