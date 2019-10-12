const uuidv4 = require('uuid/v4');

const productAPI = {
  name: 'product-api',
  version: '1.0.0',
  register: (server, options) => {
    server.route([
      {
        method: 'GET',
        path: '/featured',
        handler: featuredProducts
      }
    ]);
  }
};

const featuredProducts = (request, h) => {
  const products = [
    {
      product_id: uuidv4(),
      product_name: 'Daily Crunch Spicy Jalapeno 90 gr',
      isDiscount: true,
      discount: 10,
      price: '18000',
      image: null
    },
    {
      product_id: uuidv4(),
      product_name: 'East Bali Cashew Popcorn Salted Egg',
      isDiscount: false,
      discount: null,
      price: '29000',
      image: null
    },
    {
      product_id: uuidv4(),
      product_name: 'Daily Crunch Garlic Onion 90 gr',
      isDiscount: false,
      discount: null,
      price: '20000',
      image: null
    },
    {
      product_id: uuidv4(),
      product_name: 'Daily Crunch Garlic Onion 90 gr',
      isDiscount: false,
      discount: null,
      price: '20000',
      image: null
    },
    {
      product_id: uuidv4(),
      product_name: 'Daily Crunch Garlic Onion 90 gr',
      isDiscount: true,
      discount: 50,
      price: '20000',
      image: null
    },
    {
      product_id: uuidv4(),
      product_name: 'Daily Crunch Garlic Onion 90 gr',
      isDiscount: false,
      discount: null,
      price: '20000',
      image: null
    }
  ];
  return products;
};

module.exports = productAPI;
