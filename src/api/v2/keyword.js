const KeywordController = require('../../controller/keyword.controller');

module.exports = {
  name: 'keyword-api-v2',
  version: '2.0.0',
  register: (server) => {
    server.route([
      {
        method: 'POST',
        path: '/',
        options: {
          auth: false,
          description: 'Create new keyword',
          tags: ['api', 'Activity'],
        },
        handler: saveKeyword,
      },
      {
        method: 'GET',
        path: '/',
        options: {
          auth: false,
          description: 'Get keyword',
          tags: ['api', 'Activity'],
        },
        handler: getKeyword,
      },
      {
        method: 'GET',
        path: '/{value_id}',
        options: {
          auth: false,
          description: 'Get keyword',
          tags: ['api', 'Activity'],
        },
        handler: getKeywordByValueID,
      },
    ]);
  },
};

const saveKeyword = async (request, h) => {
  try {
    const keyword = await KeywordController.saveKeyword(request.payload);
    return h.response(keyword);
  } catch (error) {
    return error;
  }
};

const getKeyword = async (request, h) => {
  try {
    const value = await KeywordController.getKeyword();
    return h.response(value);
  } catch (error) {
    return error;
  }
};

const getKeywordByValueID = async (request, h) => {
  try {
    const { value_id } = request.params;
    const value = await KeywordController.getKeywordByValueID(value_id);
    return h.response(value);
  } catch (error) {
    return error;
  }
};
