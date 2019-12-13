const MediaHelper = require('../helpers/mediaHelper');

module.exports = {
  name: 'media-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'GET',
        path: '/',
        options: {
          auth: 'guestAuth',
          description: 'Get all media',
          tags: ['api', 'Media']
        },
        handler: getAllMedia
      }
    ]);
  }
};

const getAllMedia = async (request, h) => {
  try {
    const media = await MediaHelper.getAllMedia();
    return h.response(media);
  } catch (error) {
    return error;
  }
};
