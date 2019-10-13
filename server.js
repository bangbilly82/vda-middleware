const Good = require('@hapi/good');
const Logger = require('pino')({
  prettyPrint: true
});
const Compose = require('./manifest');
const Config = require('./config');

const initServer = async () => {
  const server = await Compose();
  await server.register({
    plugin: Good,
    options: {
      reporters: {
        myConsoleReporter: [
          {
            module: '@hapi/good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
          },
          {
            module: '@hapi/good-console'
          },
          'stdout'
        ]
      }
    }
  });
  await server.start();
  Logger.info('SERVER running on host', server.info.host, 'port', server.info.port);
  Logger.info('PADAWAN-API connection to host', Config.get('/padawanApi'));
  Logger.info('MYSQL connection to host', Config.get('/mysqlConnection').host);
  Logger.info('STATIC-FILE connection to host', Config.get('/staticFile'));
};

initServer();
