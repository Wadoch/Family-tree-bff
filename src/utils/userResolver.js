const crypto = require('crypto');
const config = require('config');
const Boom = require('boom');
const { get } = require('lodash');

const { User } = require('../database/models');

const encryptData = (data, { hashType, key, iv, outputEncoding, inputEncoding }) => {
    const cipher = crypto.createCipheriv(hashType, key, iv);

    return (cipher.update(data, outputEncoding, inputEncoding) + cipher.final(inputEncoding));
};

const decryptData = (data, { hashType, key, iv, outputEncoding, inputEncoding }) => {
    const decipher = crypto.createDecipheriv(hashType, key, iv);

    return (decipher.update(data, inputEncoding, outputEncoding) + decipher.final(outputEncoding));
};

const decryptUserData = (data) => decryptData(data, get(config, 'decryptUserData'));

const encryptUserData = (data) => encryptData(data, get(config, 'decryptUserData'));

const verifyUniqueUser = async (req, res) => {
    try{
        const username = decryptUserData(req.payload.usernameHash);
        const email = decryptUserData(req.payload.emailHash);

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
            if(username === foundUser.email) {
                return Boom.badRequest('User with this email already exist');
            }
        }

        return req.payload;
    } catch (err) {
        throw err;
    }
};

module.exports.decryptUserData = decryptUserData;
module.exports.encryptUserData = encryptUserData;
module.exports.verifyUniqueUser = verifyUniqueUser;