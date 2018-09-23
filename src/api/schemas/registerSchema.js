const Joi = require('joi');

module.exports = {
    response: {
        data: {
            statusCode: Joi.number()
                .required()
                .description('response status'),
            message: Joi.string()
                .required()
                .description('additional info returned'),
            registered: Joi.boolean()
                .required()
                .description('registered status'),
            data: {
                userId: Joi.string()
                    .required()
                    .description('Unique user id'),
                username: Joi.string()
                    .required()
                    .description('Unique user name'),
                idToken: Joi.string()
                    .required()
                    .description('JWT auth token'),
            }
        }
    }
};