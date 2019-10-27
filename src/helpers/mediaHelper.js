const WP = require('../services/wp');

const getAllMedia = () => {
  return new Promise((resolve, reject) => {
    WP.getAllMedia().then(response => {
      const media = [];
      response.map(item => {
        return media.push(item.media_details);
      });
      resolve(media);
    });
  });
};

module.exports = {
  getAllMedia
};
