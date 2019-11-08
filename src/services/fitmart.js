const WooCommerceAPI = require('woocommerce-api');
const QueryString = require('query-string');
const Config = require('../../config');

const FitmartAPI = new WooCommerceAPI({
  url: Config.get('/fitmartHost'),
  consumerKey: Config.get('/fitmartApiKey').consumerKey,
  consumerSecret: Config.get('/fitmartApiKey').consumerSecret,
  wpAPI: true,
  version: 'wc/v3'
});

const parseResponse = (result, callback) => {
  const response = JSON.parse(result.toJSON().body);
  callback(response);
};

const getAllProduct = request => {
  return new Promise((resolve, reject) => {
    const query = QueryString.stringify(request.query);
    const url = 'products' + (query ? `?${query}` : '');
    FitmartAPI.getAsync(url).then(result => {
      parseResponse(result, data => {
        resolve(data);
      });
    });
  });
};

const getAllProductByCategory = categoryId => {
  return new Promise((resolve, reject) => {
    const url = `products?category=${categoryId}&per_page=5&page=1`;
    FitmartAPI.getAsync(url).then(result => {
      parseResponse(result, data => {
        resolve(data);
      });
    });
  });
};

const getProductById = id => {
  return new Promise((resolve, reject) => {
    FitmartAPI.getAsync(`products/${id}`).then(result => {
      parseResponse(result, data => {
        resolve(data);
      });
    });
  });
};

const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    FitmartAPI.getAsync('products/categories').then(result => {
      parseResponse(result, data => {
        resolve(data);
      });
    });
  });
};

const getAllPayments = () => {
  return new Promise((resolve, reject) => {
    FitmartAPI.getAsync('payment_gateways').then(result => {
      parseResponse(result, data => {
        resolve(data);
      });
    });
  });
};

const getAllShippingMethods = () => {
  return new Promise((resolve, reject) => {
    FitmartAPI.getAsync('shipping_methods').then(result => {
      parseResponse(result, data => {
        resolve(data);
      });
    });
  });
};

const proceedOrder = data => {
  return new Promise((resolve, reject) => {
    FitmartAPI.post('orders', data, (err, result, res) => {
      resolve(JSON.parse(res));
    });
  });
};

const getAllAvailableCoupons = () => {
  return new Promise((resolve, reject) => {
    FitmartAPI.getAsync('coupons').then(result => {
      parseResponse(result, data => {
        resolve(data);
      });
    });
  });
};

const getAllCustomers = () => {
  return new Promise((resolve, reject) => {
    FitmartAPI.getAsync('customers?per_page=10').then(result => {
      parseResponse(result, data => {
        resolve(data);
      });
    });
  });
};

const getCustomerByEmail = email => {
  return new Promise((resolve, reject) => {
    FitmartAPI.getAsync(`customers?email=${email}`).then(result => {
      parseResponse(result, data => {
        resolve(data);
      });
    });
  });
};

const createNewCustomer = data => {
  return new Promise((resolve, reject) => {
    FitmartAPI.post('customers', data, (err, result, res) => {
      resolve(JSON.parse(res));
    });
  });
};

const getAllProductByQuery = query => {
  return new Promise((resolve, reject) => {
    const url = 'products?per_page=100&search=' + query;
    FitmartAPI.getAsync(url).then(result => {
      parseResponse(result, data => {
        resolve(data);
      });
    });
  });
};

module.exports = {
  getAllProduct,
  getProductById,
  getAllCategories,
  getAllPayments,
  getAllShippingMethods,
  proceedOrder,
  getAllAvailableCoupons,
  getAllCustomers,
  getCustomerByEmail,
  createNewCustomer,
  getAllProductByQuery,
  getAllProductByCategory
};
