const ProgramController = require('../controller/program.controller');

module.exports = {
  name: 'program-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'POST',
        path: '/post',
        options: {
          auth: false,
          description: 'Create new program',
          tags: ['api', 'Program']
        },
        handler: createProgram
      },
      {
        method: 'GET',
        path: '/get/all',
        options: {
          auth: false,
          description: 'Get all program',
          tags: ['api', 'Program']
        },
        handler: getAllProgram
      },
      {
        method: 'POST',
        path: '/get',
        options: {
          auth: false,
          description: 'Get program by name',
          tags: ['api', 'Program']
        },
        handler: getProgramByName
      },
      {
        method: 'POST',
        path: '/get/getDataUserProgram',
        options: {
          auth: false,
          description: 'Get program by user incharge ID',
          tags: ['api', 'Program']
        },
        handler: getProgramByUserInchargeID
      },
      {
        method: 'PUT',
        path: '/put',
        options: {
          auth: false,
          description: 'Update program',
          tags: ['api', 'Program']
        },
        handler: updateProgram
      },
      {
        method: 'DELETE',
        path: '/delete',
        options: {
          auth: false,
          description: 'Delete program',
          tags: ['api', 'Program']
        },
        handler: deleteProgram
      }
    ]);
  }
};

const createProgram = async (request, h) => {
  try {
    const program = await ProgramController.createProgram(request.payload);
    return h.response(program);
  } catch (error) {
    return error;
  }
};

const getAllProgram = async (request, h) => {
  try {
    const program = await ProgramController.getAllProgram();
    return h.response(program);
  } catch (error) {
    return error;
  }
};

const getProgramByName = async (request, h) => {
  try {
    const program = await ProgramController.getProgramByName(request.payload.nameProgram);
    return h.response(program);
  } catch (error) {
    return error;
  }
};

const getProgramByUserInchargeID = async (request, h) => {
  try {
    const program = await ProgramController.getProgramByUserInchargeID(request.payload.userInchargeId);
    return h.response(program);
  } catch (error) {
    return error;
  }
};

const updateProgram = async (request, h) => {
  try {
    const program = await ProgramController.updateProgram(request.payload);
    return h.response(program);
  } catch (error) {
    return error;
  }
};

const deleteProgram = async (request, h) => {
  try {
    const program = await ProgramController.deleteProgram(request.payload);
    return h.response(program);
  } catch (error) {
    return error;
  }
};
