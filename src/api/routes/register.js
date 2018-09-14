const { registerHandler } = require('../handlers/registerHandler');

module.exports = [
    {
        method: 'GET',
        path: '/register',
        handler: registerHandler,
    }
];