const Hapi = require('hapi');
const config = require('config');

const authPlugins = require('./src/api/plugins/auth');
const apiRoutes = require('./src/api');

const serverConfig = config.util.toObject().server;
const server = Hapi.server(serverConfig);

server.route(apiRoutes);

const init = async () => {
    await authPlugins(server);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);

    require('./src/database/utils/setMongoose');
};

init();