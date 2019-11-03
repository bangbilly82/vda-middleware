const RajaOngkir = require('../services/rajaongkir');

const getAllShippingProvince = ({ request }) => {
  return new Promise((resolve, reject) => {
    RajaOngkir.getAllProvince(request, (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(data);
    });
  });
};

const getAllShippingCity = ({ request }) => {
  return new Promise((resolve, reject) => {
    RajaOngkir.getAllCity(request, (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(data);
    });
  });
};

const getCost = ({ request }) => {
  return new Promise((resolve, reject) => {
    RajaOngkir.getCost(request, (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(data);
    });
  });
};

const getAllShippingDistrict = ({ request }) => {
  return new Promise((resolve, reject) => {
    RajaOngkir.getAllDistrict(request, (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(data);
    });
  });
};

module.exports = {
  getAllShippingProvince,
  getAllShippingCity,
  getCost,
  getAllShippingDistrict
};
