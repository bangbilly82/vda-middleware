const Hapi = require('@hapi/hapi');
const Compose = require('./manifest');

const initServer = async () => {
  const server = await Compose();
  await server.start();
  console.log('server running', server.info.uri);
};

initServer();
