const Boom = require('boom');
const uuid = require('uuid/v1');
const bcrypt = require('bcrypt');

const { User } = require('../../database/models');
const { decryptUserData } = require('../../utils/userResolver');
const { createJWT } = require('../../utils/jwtGenerator');

const getUserData = ({usernameHash, passwordHash, emailHash}) => ({
    username: decryptUserData(usernameHash),
    password: decryptUserData(passwordHash),
    email: decryptUserData(emailHash),
    userId: null,
});

const hashPassword = (password) => (bcrypt.hashSync(password, 10));

const getUserModelFromData = ({username, password, email}) => (
    new User({
        userId: uuid(),
        username: username,
        password: hashPassword(password),
        email: email,
}));

const addNewUser = async (userData) => (
    getUserModelFromData(userData)
        .save()
        .catch(err => {throw err})
);

module.exports.registerHandler = async (request, h) => {

    const userData = getUserData(request.payload);
    const responseData = await addNewUser(userData);
    const token = createJWT({ userId: responseData.userId, username: responseData.username });

    return h.response({
        statusCode: 200,
        message: 'User successfully registered',
        registered: true,
        data: {
            userId: responseData.userId,
            username: responseData.username,
            idToken: token,
        },
    });
};