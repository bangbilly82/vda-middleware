module.exports = {
  apps: [
    {
      name: 'VDA API',
      script: 'server.js',
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'dev',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
