const Config = require('./config');
const Compose = require('./manifest');
const JwtHelper = require('./src/authentication/jwtHelper');
const Logger = require('./src/utils/Logger');

const initServer = async () => {
  const server = await Compose();
  const stubAuthToken = JwtHelper.sign(Config.get('/stubAuthToken'));
  await server.start();
  Logger.info('[AUTHORIZATION-TOKEN]', stubAuthToken);
  Logger.info(`[SERVER] running on host ${server.info.host} port ${server.info.port} environment ${process.env.NODE_ENV || 'local'}`);
  Logger.info('[PADAWAN-API] connection to host', Config.get('/padawanApi'));
  Logger.info(`[MYSQL-DB] connection to host ${Config.get('/mysqlConnection').host} port ${Config.get('/mysqlConnection').port}`);
  Logger.info('[STATIC-FILE] connection to host', Config.get('/staticFile'));
};

initServer();
