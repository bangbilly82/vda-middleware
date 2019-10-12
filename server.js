const Good = require('@hapi/good');
const Compose = require('./manifest');

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
  console.log('server running', server.info.uri);
};

initServer();
