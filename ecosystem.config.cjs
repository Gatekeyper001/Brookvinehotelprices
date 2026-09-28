module.exports = {
  apps: [{
    name: 'brookvinehotelprices',
    script: '/var/www/brookvinehotelprices/current/server.js',
    cwd: '/var/www/brookvinehotelprices/current',
    env: {
      NODE_ENV: 'production',
      HOSTNAME: '127.0.0.1',
      PORT: '3001',
    },
  }],
}
