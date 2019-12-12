const WPAPI = require('wpapi');
const Config = require('../../config');
const WP = new WPAPI({ endpoint: Config.get('/fitmartHost') + '/wp-json' });

const getAllMedia = () => {
  return new Promise((resolve, reject) => {
    WP.media().then(response => {
      resolve(response);
    });
  });
};

const searchByCriteria = query => {
  return new Promise((resolve, reject) => {
    WP.search().search(query).then(response => {
      resolve(response);
    });
  });
};

module.exports = {
  getAllMedia,
  searchByCriteria
};
