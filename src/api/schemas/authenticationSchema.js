const Joi = require('joi');

module.exports = {
    request: {
        register: {
            username: Joi.string()
                .required()
                .description('Unique username'),
            email: Joi.string()
                .required()
                .description('Unique email'),
            password: Joi.string()
                .required()
                .description('password'),
        },
        auth: Joi.alternatives().try(
            Joi.object({
                username: Joi.string()
                    .required()
                    .description('Unique username'),
                password: Joi.string()
                    .required()
                    .description('password'),
            }),
            Joi.object({
                email: Joi.string()
                    .required()
                    .description('Unique email'),
                password: Joi.string()
                    .required()
                    .description('password'),
            }),
        ),
    },
    response: {
        register: {
            statusCode: Joi.number()
                .required()
                .description('response status'),
            message: Joi.string()
                .required()
                .description('additional info returned'),
            authenticated: Joi.boolean()
                .required()
                .description('authentication status'),
            data: {
                idToken: Joi.string()
                    .required()
                    .description('JWT auth token'),
            }
        },
        auth: {
            statusCode: Joi.number()
                .required()
                .description('response status'),
            message: Joi.string()
                .required()
                .description('additional info returned'),
            authenticated: Joi.boolean()
                .required()
                .description('authentication status'),
            data: {
                idToken: Joi.string()
                    .required()
                    .description('JWT auth token'),
            }
        }
    }
};