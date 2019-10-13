const Joi = require('joi');

module.exports = {
  name: 'static-file-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'GET',
        path: '/image/{image_name}',
        options: {
          auth: false,
          description: 'Serving static image file',
          tags: ['api', 'Static File'],
          validate: {
            params: {
              image_name: Joi.string().required()
            }
          }
        },
        handler: getImage
      }
    ]);
  }
};

const getImage = async (request, h) => {
  try {
    const image_name = request.params.image_name;
    return h.file(image_name);
  } catch (error) {
    return error;
  }
};
