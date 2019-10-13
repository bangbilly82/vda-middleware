const Good = require('@hapi/good');
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
  console.log('Server running on host', server.info.host);
  console.log('Padawan API connection to host', Config.get('/padawanApi'));
  console.log('MYSQL connection to host', Config.get('/mysqlConnection').host);
};

initServer();
