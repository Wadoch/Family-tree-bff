const { User } = require('../../database/models');

const meHandler = (req, h) => {
    const foundUser = User.findOne({})

    return h.response();
};

module.exports.meHandler = meHandler;