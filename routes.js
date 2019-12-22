const initServerRoute = {
  name: 'initial-route',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'GET',
        path: '/',
        options: {
          auth: false
        },
        handler: () => {
          return {
            status: {
              code: 200,
              message: 'Server Running...'
            }
          };
        }
      }
    ]);
  }
};

module.exports = [
  {
    plugin: initServerRoute
  },
  {
    plugin: require('./src/api/user'),
    routes: {
      prefix: '/api/user'
    }
  },
  {
    plugin: require('./src/api/division'),
    routes: {
      prefix: '/api/division'
    }
  },
  {
    plugin: require('./src/api/rating'),
    routes: {
      prefix: '/api/rating'
    }
  },
  {
    plugin: require('./src/api/program'),
    routes: {
      prefix: '/api/program'
    }
  },
  {
    plugin: require('./src/api/activity'),
    routes: {
      prefix: '/api/activity'
    }
  },
  {
    plugin: require('./src/api/keyword'),
    routes: {
      prefix: '/api/keyword'
    }
  },
  {
    plugin: require('./src/api/value'),
    routes: {
      prefix: '/api/value'
    }
  }
];
