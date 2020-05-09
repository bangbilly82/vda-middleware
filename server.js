const Config = require('./config');
const Compose = require('./manifest');
const Logger = require('./src/utils/Logger');
const MongoServer = require('./src/services/mongodb');

const initServer = async () => {
  const server = await Compose();
  await MongoServer();
  await server.start();
  Logger.info(
    `[SERVER] running on host ${server.info.host} port ${
      server.info.port
    } environment ${process.env.NODE_ENV || 'local'}`
  );
  Logger.info(`[MONGO-DB] connection to host ${Config.get('/mongodb').host}`);
  Logger.info(
    `[MYSQL-DB] connection to host ${Config.get('/mysqlConnection').host}`
  );
  console.log(process.env.HOME);
};

initServer();
