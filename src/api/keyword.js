const KeywordController = require('../controller/keyword.controller');

module.exports = {
  name: 'keyword-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'POST',
        path: '/post',
        options: {
          auth: false,
          description: 'Create new keyword',
          tags: ['api', 'Keyword']
        },
        handler: createKeyword
      },
      {
        method: 'GET',
        path: '/get/all',
        options: {
          auth: false,
          description: 'Get all keyword',
          tags: ['api', 'Keyword']
        },
        handler: getAllKeyword
      },
      {
        method: 'POST',
        path: '/get',
        options: {
          auth: false,
          description: 'Get keyword by name',
          tags: ['api', 'Keyword']
        },
        handler: getKeywordByName
      },
      {
        method: 'PUT',
        path: '/put',
        options: {
          auth: false,
          description: 'Update keyword',
          tags: ['api', 'Keyword']
        },
        handler: updateKeyword
      },
      {
        method: 'DELETE',
        path: '/delete',
        options: {
          auth: false,
          description: 'Delete keyword',
          tags: ['api', 'Keyword']
        },
        handler: deleteKeyword
      }
    ]);
  }
};

const createKeyword = async (request, h) => {
  try {
    const keyword = await KeywordController.createKeyword(request.payload);
    return h.response(keyword);
  } catch (error) {
    return error;
  }
};

const getAllKeyword = async (request, h) => {
  try {
    const keyword = await KeywordController.getAllKeyword();
    return h.response(keyword);
  } catch (error) {
    return error;
  }
};

const getKeywordByName = async (request, h) => {
  try {
    const keyword = await KeywordController.getKeywordByName(request.payload.keywordName);
    return h.response(keyword);
  } catch (error) {
    return error;
  }
};

const updateKeyword = async (request, h) => {
  try {
    const keyword = await KeywordController.updateKeyword(request.payload);
    return h.response(keyword);
  } catch (error) {
    return error;
  }
};

const deleteKeyword = async (request, h) => {
  try {
    const keyword = await KeywordController.deleteKeyword(request.payload);
    return h.response(keyword);
  } catch (error) {
    return error;
  }
};
