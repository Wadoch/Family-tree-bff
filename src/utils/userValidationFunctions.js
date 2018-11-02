const Boom = require('boom');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const config = require('config');

const { User } = require('../database/models');
const { decryptAuthPassword } = require('./crypto');

const decryptPassword = (req) => decryptAuthPassword(req.payload.password);

const verifyUniqueUser = async (req) => {
    try{
        const {username, email} = req.payload;

        const foundUser = await User.findOne({
            $or: [
                { email: email},
                { username: username },
            ]
        }).exec();

        if(foundUser){
            if(username === foundUser.username) {
                return Boom.badRequest('User with this username already exist');
            }
            if(email === foundUser.email) {
                return Boom.badRequest('User with this email already exist');
            }
        }

        return req.payload;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const verifyCredentials = async (req) => {
    try {
        const password = req.pre.password;

        const foundUser = await User.findOne({
            $or: [
                { username: req.payload.username },
                { email: req.payload.email },
            ]
        }).exec();

        if(foundUser) {
            if(!bcrypt.compareSync(password, foundUser.password)) {
                return Boom.badRequest('Wrong password');
            }
        } else {
            return Boom.badRequest('Wrong username');
        }

        return foundUser;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const verifyJWT = async (req) => {
    const { userToken } = req.payload;

    const { userId, username } = JWT.verify(userToken, config.get('jwt.secretKey'));

    return {
        userId,
        username
    };
};

module.exports.verifyUniqueUser = verifyUniqueUser;
module.exports.verifyCredentials = verifyCredentials;
module.exports.decryptPassword = decryptPassword;
module.exports.verifyJWT = verifyJWT;