const GraphicController = require('../controller/graphic.controller');

module.exports = {
  name: 'graphic-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'GET',
        path: '/get',
        options: {
          auth: false,
          description: 'Get all graphic and comment',
          tags: ['api', 'Graphic']
        },
        handler: getAllGraphicAndComment
      },
      {
        method: 'GET',
        path: '/get/Assessment',
        options: {
          auth: false,
          description: 'Get all graphic and comment assessment',
          tags: ['api', 'Graphic']
        },
        handler: getAllGraphicAndCommentAssessment
      }
    ]);
  }
};

const getAllGraphicAndComment = async (request, h) => {
  try {
    const graphic = await GraphicController.getAllGraphicAndComment();
    return h.response(graphic);
  } catch (error) {
    return error;
  }
};

const getAllGraphicAndCommentAssessment = async (request, h) => {
  try {
    const graphic = await GraphicController.getAllGraphicAndCommentAssessment();
    return h.response(graphic);
  } catch (error) {
    return error;
  }
};
