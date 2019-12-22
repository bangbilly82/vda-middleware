const DivisionController = require('../controller/division.controller');

module.exports = {
  name: 'division-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'POST',
        path: '/post',
        options: {
          auth: false,
          description: 'Create new division',
          tags: ['api', 'Division']
        },
        handler: createDivision
      },
      {
        method: 'POST',
        path: '/get',
        options: {
          auth: false,
          description: 'Get division',
          tags: ['api', 'Division']
        },
        handler: getDivision
      },
      {
        method: 'GET',
        path: '/getall',
        options: {
          auth: false,
          description: 'Get all division',
          tags: ['api', 'Division']
        },
        handler: getAllDivision
      },
      {
        method: 'POST',
        path: '/get/getDataDivisionUser',
        options: {
          auth: false,
          description: 'Get all division',
          tags: ['api', 'Division']
        },
        handler: getDivisionByUserID
      },
      {
        method: 'POST',
        path: '/get/getDataDivisionHeadUser',
        options: {
          auth: false,
          description: 'Get all division',
          tags: ['api', 'Division']
        },
        handler: getDivisionByHeadUserID
      },
      {
        method: 'PUT',
        path: '/put',
        options: {
          auth: false,
          description: 'Get all division',
          tags: ['api', 'Division']
        },
        handler: updateDivision
      },
      {
        method: 'DELETE',
        path: '/delete',
        options: {
          auth: false,
          description: 'Get all division',
          tags: ['api', 'Division']
        },
        handler: deleteDivision
      }
    ]);
  }
};

const createDivision = async (request, h) => {
  try {
    const payload = request.payload;
    const division = await DivisionController.createDivision(payload);
    return h.response(division);
  } catch (error) {
    return error;
  }
};

const getDivision = async (request, h) => {
  try {
    const division = await DivisionController.getDivision(request.payload.division);
    return h.response(division);
  } catch (error) {
    return error;
  }
};

const getAllDivision = async (request, h) => {
  try {
    const division = await DivisionController.getAllDivision();
    return h.response(division);
  } catch (error) {
    return error;
  }
};

const getDivisionByUserID = async (request, h) => {
  try {
    const division = await DivisionController.getDivisionByDivisionUserID(request.payload.divisionUserId);
    return h.response(division);
  } catch (error) {
    return error;
  }
};

const getDivisionByHeadUserID = async (request, h) => {
  try {
    const division = await DivisionController.getDivisionByHeadUserID(request.payload.userIdHead);
    return h.response(division);
  } catch (error) {
    return error;
  }
};

const updateDivision = async (request, h) => {
  try {
    const division = await DivisionController.updateDivisionByID(request.payload);
    return h.response(division);
  } catch (error) {
    return error;
  }
};

const deleteDivision = async (request, h) => {
  try {
    const division = await DivisionController.deleteDivisionByID(request.payload);
    return h.response(division);
  } catch (error) {
    return error;
  }
};
