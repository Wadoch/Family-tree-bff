const Hapi = require('hapi');
const config = require('config');

const plugins = require('./src/api/plugins');
const apiRoutes = require('./src/api');

const serverConfig = config.util.toObject().server;
const server = Hapi.server(serverConfig);

(async () => {
    await plugins(server);

    server.route(apiRoutes);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);

    require('./src/database/utils/setMongoose');
})();