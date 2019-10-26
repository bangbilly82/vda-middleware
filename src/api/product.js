const Joi = require('joi');
const ProductHelper = require('../helpers/productHelper');

module.exports = {
  name: 'product-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'GET',
        path: '/{category_name?}',
        options: {
          auth: 'guestAuth',
          description: 'Get all products from fitmart',
          tags: ['api', 'Product']
        },
        handler: getAllFitmartProducts
      },
      {
        method: 'GET',
        path: '/id/{product_id}',
        options: {
          auth: 'guestAuth',
          description: 'Get fitmart product by id',
          tags: ['api', 'Product'],
          validate: {
            params: {
              product_id: Joi.string().required()
            }
          }
        },
        handler: getFitmartProductById
      },
      {
        method: 'GET',
        path: '/payments',
        options: {
          auth: 'guestAuth',
          description: 'Get all payments from fitmart',
          tags: ['api', 'Product']
        },
        handler: getAllFitmartPayments
      },
      {
        method: 'GET',
        path: '/shippings',
        options: {
          auth: 'guestAuth',
          description: 'Get all shippings method from fitmart',
          tags: ['api', 'Product']
        },
        handler: getAllShippingMethods
      },
      {
        method: 'POST',
        path: '/orders',
        options: {
          auth: 'guestAuth',
          description: 'Post orders',
          tags: ['api', 'Product']
        },
        handler: proceedOrder
      },
      {
        method: 'GET',
        path: '/coupons',
        options: {
          auth: 'guestAuth',
          description: 'Get all available coupons',
          tags: ['api', 'Product']
        },
        handler: getAllAvailableCoupons
      }
    ]);
  }
};

const getAllFitmartProducts = async (request, h) => {
  try {
    const category = request.params.category_name;
    const products = await ProductHelper.getAllFitmartProducts(category);
    return h.response(products);
  } catch (error) {
    return error;
  }
};

const getFitmartProductById = async (request, h) => {
  try {
    const product_id = request.params.product_id;
    const product = await ProductHelper.getFitmartProductById(product_id);
    return h.response(product);
  } catch (error) {
    return error;
  }
};

const getAllFitmartPayments = async (request, h) => {
  try {
    const payments = await ProductHelper.getAllFitmartPayments();
    return h.response(payments);
  } catch (error) {
    return error;
  }
};

const getAllShippingMethods = async (request, h) => {
  try {
    const shippings = await ProductHelper.getAllShippingMethods();
    return h.response(shippings);
  } catch (error) {
    return error;
  }
};

const proceedOrder = async (request, h) => {
  try {
    const orders = await ProductHelper.proceedOrder({ request });
    return h.response(orders);
  } catch (error) {
    return error;
  }
};

const getAllAvailableCoupons = async (request, h) => {
  try {
    const couponse = await ProductHelper.getAllAvailableCoupons();
    return h.response(couponse);
  } catch (error) {
    return error;
  }
};
