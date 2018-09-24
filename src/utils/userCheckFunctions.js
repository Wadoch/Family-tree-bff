const Boom = require('boom');
const bcrypt = require('bcrypt');

const { User } = require('../database/models');

const verifyUniqueUser = async (req, res) => {
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
            if(username === foundUser.email) {
                return Boom.badRequest('User with this email already exist');
            }
        }

        return req.payload;
    } catch (err) {
        throw err;
    }
};

const verifyCredentials = async (req, h) => {
    try {
        const { password } = req.payload;

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
        // return req.payload;
    } catch (err) {
        throw err;
    }
};

module.exports.verifyUniqueUser = verifyUniqueUser;
module.exports.verifyCredentials = verifyCredentials;