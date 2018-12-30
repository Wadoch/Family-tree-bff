const { meHandler } = require('../handlers/userHandler');
const { errorSchema } = require('../schemas');
const { verifyJWT } = require('../../utils/userValidationFunctions');

module.exports = [
    {
        method: 'POST',
        path: '/me',
        config: {
            description: 'get user information',
            notes: 'Get all user info',
            auth: 'jwt',
            pre: [
                { method: verifyJWT, assign: 'user' }
            ],
            handler: meHandler,
            response: {
                status: {
                    400: errorSchema,
                    500: errorSchema,
                }
            }
        }
    }
];