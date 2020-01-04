const ChartController = require('../controller/chart.controller');

module.exports = {
  name: 'chart-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'POST',
        path: '/get/commentForChart',
        options: {
          auth: false,
          description: 'Get chart comment',
          tags: ['api', 'Chart']
        },
        handler: getUserComment
      }
    ]);
  }
};

const getUserComment = async (request, h) => {
  try {
    const comment = await ChartController.getUserComment(request.payload);
    return h.response(comment);
  } catch (error) {
    return error;
  }
};
