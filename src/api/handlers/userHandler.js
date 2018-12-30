const { User } = require('../../database/models');

const meHandler = async (req, h) => {
    const { username } = req.pre.user;
    const foundUser = await User.findOne({username: username});

    const res = {
        username: foundUser.username,
        email: foundUser.email,
        registerData: foundUser.registerData,
    };
    return h.response({
        statusCode: 200,
        data: {
            user: res
        },
    });
};

module.exports.meHandler = meHandler;