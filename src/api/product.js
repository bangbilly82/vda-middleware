const Joi = require('joi');
const ProductHelper = require('../helpers/productHelper');
const CategoriesHelper = require('../helpers/categoriesHelper');

module.exports = {
  name: 'product-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'GET',
        path: '/',
        options: {
          auth: 'guestAuth',
          description: 'Get all products from fitmart',
          tags: ['api', 'Product']
        },
        handler: getAllFitmartProducts
      },
      {
        method: 'GET',
        path: '/category/{category_name?}',
        options: {
          auth: 'guestAuth',
          description: 'Get all products by category from fitmart',
          tags: ['api', 'Product']
        },
        handler: getAllFitmartProductsByCategory
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
      },
      {
        method: 'GET',
        path: '/search',
        options: {
          auth: 'guestAuth',
          description: 'Get all matching product by search query',
          tags: ['api', 'Product']
        },
        handler: searchByCriteria
      },
      {
        method: 'GET',
        path: '/retail',
        options: {
          auth: 'guestAuth',
          description: 'Get all products form DB',
          tags: ['api', 'Product']
        },
        handler: getAllProductsFromDB
      },
      {
        method: 'GET',
        path: '/retail/id/{product_id}',
        options: {
          auth: 'guestAuth',
          description: 'Get products by ID form DB',
          tags: ['api', 'Product']
        },
        handler: getProductsByID
      },
      {
        method: 'GET',
        path: '/retail/related-products',
        options: {
          auth: 'guestAuth',
          description: 'Get related products based on product ID',
          tags: ['api', 'Product'],
          validate: {
            query: {
              related_ids: Joi.string().optional()
            }
          }
        },
        handler: getRelatedProducts
      },
      {
        method: 'GET',
        path: '/retail/slug/{product_slug}',
        options: {
          auth: 'guestAuth',
          description: 'Get products by slug form fitmart',
          tags: ['api', 'Product']
        },
        handler: getProductBySlug
      }
    ]);
  }
};

const getAllFitmartProducts = async (request, h) => {
  try {
    const products = await ProductHelper.getAllFitmartProducts({ request });
    return h.response(products);
  } catch (error) {
    return error;
  }
};

const getAllFitmartProductsByCategory = async (request, h) => {
  try {
    const category = request.params.category_name;
    let categories = [];
    if (category) {
      categories = await CategoriesHelper.getAllCategories();
      // find categories ID
      categories = categories.filter(item => {
        return item.slug.toLowerCase() === category.toLowerCase();
      })
    }
    const products = await ProductHelper.getAllProductByCategory(category && categories[0].id, request);
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
    const validateUser = await ProductHelper.checkIfUserExist({ request });
    const orders = await ProductHelper.proceedOrder({ request, user: validateUser.user });
    return h.response(orders);
  } catch (error) {
    return h.response(error);
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

const searchByCriteria = async (request, h) => {
  try {
    const query = request.query.query;
    if (query.length === 0) {
      return h.response([]);
    }
    const products = await ProductHelper.getAllFitmartProductsByQuery(query);
    return h.response(products);
  } catch (error) {
    return error;
  }
};

const getAllProductsFromDB = async (request, h) => {
  try {
    const products = await ProductHelper.getProductDB();
    return h.response(products);
  } catch (error) {
    return error;
  }
};

const getProductsByID = async (request, h) => {
  try {
    const id = request.params.product_id;
    return Promise.all([ProductHelper.getProductsByID(id), ProductHelper.getFitmartProductById(id)]).then(products => {
      const response = {
        ...products[1],
        fitco_product_detail: {
          product_id: products[0].product_id
        }
      }
      return h.response(response);
    });
  } catch (error) {
    return error;
  }
};

const getRelatedProducts = async (request, h) => {
  try {
    const related_ids = request.query.related_ids;
    const product_id_array = related_ids.split(',');
    return Promise.all(product_id_array.map(id => {
      return ProductHelper.getFitmartProductById(id);
    })).then(response => {
      return h.response(response);
    });
  } catch (error) {
    return error;
  }
};

const getProductBySlug = async (request, h) => {
  try {
    const product_slug = request.params.product_slug;
    const product = await ProductHelper.getProductBySlug(product_slug);
    return h.response(product);
  } catch (error) {
    return error;
  }
};
