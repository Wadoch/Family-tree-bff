const { registerHandler } = require('../handlers/registerHandler');
const { registerSchema, errorSchema } = require('../schemas');

module.exports = [
    {
        method: 'POST',
        path: '/register',
        config: {
            description: 'register endpoint',
            notes: 'Add new user to database',
            handler: registerHandler,
            response: {
                status: {
                    200: registerSchema.response,
                    400: errorSchema,
                    500: errorSchema,
                }
            }
        }
    }
];