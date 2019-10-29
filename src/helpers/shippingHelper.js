const RajaOngkir = require('../services/rajaongkir');

const getAllShippingProvince = ({ request }) => {
  return new Promise((resolve, reject) => {
    RajaOngkir.getAllProvince(request, (error, data) => {
      const payload = JSON.parse(data);
      if (error) {
        reject(error);
        return;
      }
      if (payload.rajaongkir && payload.rajaongkir.results) {
        resolve(payload.rajaongkir.results);
      }
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

const getAllShippingDistrict = ({ request }) => {
  return new Promise((resolve, reject) => {
    RajaOngkir.getAllDistrict(request, (error, data) => {
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
  getCost,
  getAllShippingDistrict
};
