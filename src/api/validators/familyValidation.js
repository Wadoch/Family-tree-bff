const Boom = require('boom');
const { Family } = require('../../database/models');

const verifyFamilyExist = async (req) => {
    const { userId } = req.pre.user;
    const { familyId } = req.payload;

    try {
        const foundFamily = await Family.findOne({familyId: familyId, owner: userId});
        if(foundFamily) {
            return foundFamily;
        }
        throw new Error('Family not exist');
    } catch(err) {
        return Boom.badRequest(err);
    }
};

const checkFamilyNameIsAvailable = async (req) => {
    const { userId } = req.pre.user;
    const { name } = req.payload;

    try {
        const foundFamily = await Family.findOne({name: name, owner: userId});
        if(!foundFamily) {
            return req.payload.name;
        }
        throw new Error('Family already exist');
    } catch(err) {
        return Boom.badRequest(err);
    }
};

module.exports.verifyFamilyExist = verifyFamilyExist;
module.exports.checkFamilyNameIsAvailable = checkFamilyNameIsAvailable;