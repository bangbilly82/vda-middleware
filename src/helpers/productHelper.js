const Config = require('../../config');
const Padawan = require('../services/padawan');
const Utils = require('../utils/Utils');
const host = Config.get('/staticFile');
const _ = require('lodash');
const Fitmart = require('../services/fitmart');
const WP = require('../services/wp');
const UserHelper = require('../helpers/userHelper');
const ProductModel = require('../models/productModel');

const getAllPointBoosterMerchant = ({ request }) => {
  return new Promise((resolve, reject) => {
    Padawan.getAllPointBoosterMerchant(request, (error, data) => {
      const payload = JSON.parse(data);
      if (error) {
        reject(error);
        return;
      }
      resolve(payload);
    });
  });
};

const getProductJSON = () => {
  return new Promise((resolve, reject) => {
    Utils.readProductJson().then(results => {
      const product = [];
      results.forEach(item => {
        product.push({
          ...item,
          image_url: `${host}/api/static/file/image/${item.image}`
        });
      });
      resolve(product);
    });
  });
};

const getProductById = id => {
  return new Promise((resolve, reject) => {
    Utils.readProductJson().then(results => {
      const product = results.filter(item => {
        return item.product_id === id;
      });
      _.extend(product[0], {
        image_url: `${host}/api/static/file/image/${product[0].image}`
      });
      resolve(product[0]);
    });
  });
};

const getAllFitmartProducts = ({ request }) => {
  return new Promise((resolve, reject) => {
    Fitmart.getAllProduct(request).then(response => {
      resolve(response);
    });
  });
};

const getAllProductByCategory = categoryId => {
  return new Promise((resolve, reject) => {
    Fitmart.getAllProductByCategory(categoryId).then(response => {
      resolve(response);
    });
  });
};

const getFitmartProductById = id => {
  return new Promise((resolve, reject) => {
    Fitmart.getProductById(id).then(response => {
      resolve(response);
    });
  });
};

const getAllFitmartPayments = () => {
  return new Promise((resolve, reject) => {
    Fitmart.getAllPayments().then(response => {
      resolve(response);
    });
  });
};

const getAllShippingMethods = () => {
  return new Promise((resolve, reject) => {
    Fitmart.getAllShippingMethods().then(response => {
      resolve(response);
    });
  });
};

const proceedOrder = ({ request, user }) => {
  return new Promise((resolve, reject) => {
    const data = request.payload;
    _.extend(data, {
      customer_id: user.id
    });
    Fitmart.proceedOrder(data).then(response => {
      resolve(response);
    });
  });
};

const checkIfUserExist = async ({ request }) => {
  try {
    const { payload } = request;
    const email = payload.billing.email;
    const user = await UserHelper.getAllCustomersByEmail(email);
    if (!_.isEmpty(user)) {
      return Promise.resolve({ request, user: user[0] });
    } else {
      const data = {
        email: email,
        first_name: payload.billing.first_name,
        last_name: payload.billing.last_name,
        username: email,
        billing: { ...payload.billing },
        shipping: { ...payload.shipping }
      };
      const newUser = await UserHelper.createNewCustomer(data);
      return Promise.resolve({ request, user: newUser });
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const getAllAvailableCoupons = () => {
  return new Promise((resolve, reject) => {
    Fitmart.getAllAvailableCoupons().then(response => {
      resolve(response);
    });
  });
};

const searchByCriteria = query => {
  return new Promise((resolve, reject) => {
    WP.searchByCriteria(query).then(response => {
      resolve(response);
    });
  });
};

const getAllFitmartProductsByQuery = query => {
  return new Promise((resolve, reject) => {
    Fitmart.getAllProductByQuery(query).then(response => {
      resolve(response);
    });
  });
};

const getProductDB = () => {
  return new Promise((resolve, reject) => {
    ProductModel.getProducts()
      .then(results => {
        resolve(results);
      })
      .catch(err => {
        reject(Boom.badImplementation(err));
      });
  });
};

const getProductsByID = id => {
  return new Promise((resolve, reject) => {
    ProductModel.getProductsByID(id)
      .then(results => {
        resolve(results);
      })
      .catch(err => {
        reject(Boom.badImplementation(err));
      });
  });
};

module.exports = {
  getAllPointBoosterMerchant,
  getProductJSON,
  getProductById,
  getAllFitmartProducts,
  getFitmartProductById,
  getAllFitmartPayments,
  getAllShippingMethods,
  proceedOrder,
  getAllAvailableCoupons,
  searchByCriteria,
  checkIfUserExist,
  getAllFitmartProductsByQuery,
  getAllProductByCategory,
  getProductDB,
  getProductsByID
};
