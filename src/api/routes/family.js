const {
    addHandler,
    editHandler,
    removeHandler,
    listHandler,
} = require('../handlers/familyHandler');
const {
    verifyFamilyExist,
    checkFamilyNameIsAvailable,
} = require('../../utils/familyValidation');
const { errorSchema } = require('../schemas');
const { verifyJWT } = require('../../utils/userValidationFunctions');

module.exports = [
    {
        method: 'POST',
        path: '/family/add',
        config: {
            description: 'Add new family',
            notes: 'Add new family',
            auth: 'jwt',
            pre: [
                { method: verifyJWT, assign: 'user' },
                { method: checkFamilyNameIsAvailable, assign: 'familyName' }
            ],
            handler: addHandler,
            response: {
                status: {
                    400: errorSchema,
                    500: errorSchema,
                }
            }
        }
    }, {
        method: 'POST',
        path: '/family/edit',
        config: {
            description: 'Edit existing family',
            notes: 'Edit existing family',
            auth: 'jwt',
            pre: [
                { method: verifyJWT, assign: 'user' },
                { method: verifyFamilyExist, assign: 'family' }
            ],
            handler: editHandler,
            response: {
                status: {
                    400: errorSchema,
                    500: errorSchema,
                }
            }
        }
    }, {
        method: 'POST',
        path: '/family/remove',
        config: {
            description: 'Remove existing family',
            notes: 'Remove existing family',
            auth: 'jwt',
            pre: [
                { method: verifyJWT, assign: 'user' },
                { method: verifyFamilyExist, assign: 'family' }
            ],
            handler: removeHandler,
            response: {
                status: {
                    400: errorSchema,
                    500: errorSchema,
                }
            }
        }
    }, {
        method: 'POST',
        path: '/family/list',
        config: {
            description: 'Get all user family',
            notes: 'Get all user family',
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
    }, {
        method: 'POST',
        path: '/family/get',
        config: {
            description: 'Get single family',
            notes: 'Get single family',
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
