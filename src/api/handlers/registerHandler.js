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
    userId: null,
});

const addNewUser = async (userData) => {
    const {username, password, email} = userData;
    userData.userId = uuid();

    const newUser = new User({
        userId: userData.userId,
        username: username,
        password: password,
        email: email,
    });

    return newUser.save().catch(err => {throw err});
};

module.exports.registerHandler = async (request, h) => {
    const userData = getUserData(request.payload);

    try{
        await addNewUser(userData);
    }
    catch(err) {
        if(err.code === 11000){
            return Boom.badData('User already exist');
        }
        return err;
    }
    return h.response({
        statusCode: 200,
        message: 'User successfully registered',
        registered: true,
        data: userData,
    });
};