const uuid = require('uuid/v1');
const bcrypt = require('bcrypt');

const { User } = require('../../database/models');
const { createJWT } = require('../../utils/jwtGenerator');

const hashPassword = (password) => (bcrypt.hashSync(password, 10));

const getUserData = ({username, password, email}) => ({
    username: username,
    password: hashPassword(password),
    email: email,
    userId: null,
});

const getUserModelFromData = ({username, password, email}) => (
    new User({
        userId: uuid(),
        username,
        password,
        email,
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
        authenticated: true,
        data: {
            idToken: token
        },
    });
};

module.exports.authenticateHandler = async (request, h) => {
    const { username, userId } = request.pre.user;

    return h.response({
        statusCode: 200,
        message: 'User successfully authenticated',
        authenticated: true,
        data: {
            idToken: createJWT({ userId, username}),
        }
    })
};