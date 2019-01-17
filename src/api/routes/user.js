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

// TODO: add person & family to db
// TODO: handle routes per user:
//  /family/add
//  /family/remove
//  /family/list (arr of people from family, num of people)
//  /family/edit - in the future
//  /person/add
//  /person/remove
//  /person/get (return all info - like /me)
//  /person/edit
