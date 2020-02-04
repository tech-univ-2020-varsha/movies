const hapi = require('@hapi/hapi');
const movieRoutes = require('./src/routes/movieRoutes');

const server = hapi.Server({
  host: 'localhost',
  port: 8080,
});
server.route(movieRoutes);

module.exports = server;
