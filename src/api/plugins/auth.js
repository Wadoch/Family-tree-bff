const config = require('config');

const {
    User,
} = require('../../database/models');

const jwtValidate = async (decoded, request) => {
    const response = {};

    User.findOne({username: decoded.username, userId: decoded.userId}, (err, docs) => {
        if(err) return err;

        response.isValid = !!docs;
    });

    return response;
};

module.exports = async (server) => {
    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt', {
        key: config.get('jwt.secretKey'),
        validate: jwtValidate,
        verifyOptions: { algorithms: 'HS256' },
    });

    server.auth.default('jwt');
};

