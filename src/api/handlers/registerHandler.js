const Boom = require('boom');
const uuid = require('uuid/v1');

const {
    User,
} = require('../../database/models');

const {
    decryptUserData,
} = require('../../utils/userDataResolver');

const getUserData = ({usernameHash, passwordHash, emailHash}) => ({
    username: decryptUserData(usernameHash),
    password: decryptUserData(passwordHash),
    email: decryptUserData(emailHash),
});

const isUserExist = ({username}) => {
    // check user exist in db

};

const addNewUser = (userData) => {
    const {username, password, email} = userData;

    const newUser = new User({
        userId: uuid(),
        username: username,
        password: password,
        email: email,
    });

    try {
        newUser.save((err, user) => err);
    } catch (err) {
        return err;
    }
    // add jwt to userData
};

const userReply = ({jwt}) => ({
    jwt: jwt,
    message: 'User successfully registered',
    registered: true,
});

module.exports.registerHandler = async (request, reply) => {
    const userData = getUserData(request.payload);

    if(isUserExist(userData)) {
        return reply(Boom.badData('User already exist in database'));
    }

    try {
        await addNewUser(userData);
    } catch (err) {
        return err;
    }

    return reply(userReply(userData));
};