const Boom = require('boom');
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');
const config = require('config');

const { User } = require('../database/models');

const encryptData = (data) => {
    return crypto.AES.encrypt(data, config.get('decryptUserData.key')).toString();
};

const decryptData = (data) => {
    const bytes  = crypto.AES.decrypt(data, config.get('decryptUserData.key'));

    return bytes.toString(crypto.enc.Utf8);
};

const decryptPassword = (req) => decryptData(req.payload.password);

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

module.exports.verifyUniqueUser = verifyUniqueUser;
module.exports.verifyCredentials = verifyCredentials;
module.exports.decryptPassword = decryptPassword;