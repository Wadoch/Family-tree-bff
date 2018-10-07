const config = require('config');

const {
    User,
} = require('../../database/models');

const jwtValidate = async (decoded, request) => {
    const response = { isValid: false };

    try {
        await User.findOne({username: decoded.username, userId: decoded.userId}).exec();

        response.isValid = true;
    } catch (err) {
        console.log(err);
        throw err;
    }

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

