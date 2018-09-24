const { registerHandler, authenticateHandler } = require('../handlers/authenticationHandler');
const { authenticationSchema, errorSchema } = require('../schemas');
const { verifyUniqueUser, verifyCredentials } = require('../../utils/userCheckFunctions');

module.exports = [
    {
        method: 'POST',
        path: '/register',
        config: {
            description: 'register endpoint',
            notes: 'Add new user to database',
            auth: false,
            pre: [
                { method: verifyUniqueUser },
            ],
            handler: registerHandler,
            response: {
                status: {
                    200: authenticationSchema.response.register,
                    400: errorSchema,
                    500: errorSchema,
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/authenticate',
        config: {
            description: 'user authentication endpoint',
            notes: 'Authenticate user',
            auth: false,
            pre: [
                { method: verifyCredentials , assign: 'user' },
            ],
            validate: {
                payload: authenticationSchema.request.auth
            },
            handler: authenticateHandler,
            response: {
                status: {
                    200: authenticationSchema.response.auth,
                    400: errorSchema,
                    500: errorSchema,
                }
            }
        }
    }
];