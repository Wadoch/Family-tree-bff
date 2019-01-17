const {
    addHandler,
    getHandler,
    removeHandler,
    listHandler,
} = require('../handlers/personHandler');
const {
    verifyPersonExist,
    parsePerson,
} = require('../validators/personValidation');
const { errorSchema } = require('../schemas');
const { verifyJWT } = require('../validators/userValidationFunctions');

module.exports = [
    {
        method: 'POST',
        path: '/person/add',
        config: {
            description: 'Add new person',
            notes: 'Add new person',
            auth: 'jwt',
            pre: [
                { method: verifyJWT, assign: 'user' },
                { method: parsePerson, assign: 'parsePerson' },
            ],
            handler: addHandler,
            response: {
                status: {
                    400: errorSchema,
                    500: errorSchema,
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/person/remove',
        config: {
            description: 'Remove existing person',
            notes: 'Remove existing person',
            auth: 'jwt',
            pre: [
                { method: verifyJWT, assign: 'user' },
                { method: verifyPersonExist, assign: 'person' }
            ],
            handler: removeHandler,
            response: {
                status: {
                    400: errorSchema,
                    500: errorSchema,
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/person/get',
        config: {
            description: 'Get single person',
            notes: 'Get single person',
            auth: 'jwt',
            pre: [
                { method: verifyJWT, assign: 'user' },
                { method: verifyPersonExist, assign: 'person' }
            ],
            handler: getHandler,
            response: {
                status: {
                    400: errorSchema,
                    500: errorSchema,
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/person/listAll',
        config: {
            description: 'Get all people per user',
            notes: 'Get all people per user',
            auth: 'jwt',
            pre: [
                { method: verifyJWT, assign: 'user' }
            ],
            handler: listHandler,
            response: {
                status: {
                    400: errorSchema,
                    500: errorSchema,
                }
            }
        }
    }
];
