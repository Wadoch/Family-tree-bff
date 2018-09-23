const { registerHandler } = require('../handlers/registerHandler');
const { registerSchema, errorSchema } = require('../schemas');
const { verifyUniqueUser } = require('../../utils/userResolver');

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
                    200: registerSchema.response.data,
                    400: errorSchema,
                    500: errorSchema,
                }
            }
        }
    }
];