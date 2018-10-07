const { meHandler } = require('../handlers/userHandler');
const { errorSchema } = require('../schemas');

module.exports = [
    {
        method: 'GET',
        path: '/me',
        config: {
            description: 'get user information',
            notes: 'Get all user info',
            auth: 'jwt',
            handler: meHandler,
            response: {
                status: {
                    // 200: authenticationSchema.response.register,
                    400: errorSchema,
                    500: errorSchema,
                }
            }
        }
    }
];