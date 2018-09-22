const Joi = require('joi');

module.exports = {
    statusCode: Joi.number().required().description('error status code'),
    error: Joi.string().required().description('error type'),
    message: Joi.string().required().description('error message'),
};
