const Joi = require('joi');

module.exports = {
    response: {
        data: {
            jwt: Joi.string()
                .required()
                .description('JWT auth token'),
            message: Joi.string()
                .required()
                .description('additional info returned'),
            registered: Joi.boolean()
                .required()
                .description('registered status'),
        }
    }
};