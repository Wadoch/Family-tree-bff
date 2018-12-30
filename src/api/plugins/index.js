const authPlugins = require('./auth');
const loggerPlugin = require('./logger');

module.exports = async (server) => {
    await authPlugins(server);
    await loggerPlugin(server);
};
