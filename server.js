const Hapi = require('hapi');
const config = require('config');

const mongoose = require('./src/utils/setMongoose');

const apiRoutes = require('./src/api');

const serverConfig = config.util.toObject().server;
const server = Hapi.server(serverConfig);

server.route(apiRoutes);

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();