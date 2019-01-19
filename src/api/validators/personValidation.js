const Boom = require('boom');
const { Person } = require('../../database/models');

const verifyPersonExist = async (req) => {
    const { userId } = req.pre.user;
    const { personId } = req.payload;

    try {
        const foundPerson = await Person.findOne({personId: personId, owner: userId});
        if(foundPerson) {
            return foundPerson;
        }
        throw new Error('Person not exist');
    } catch(err) {
        return Boom.badRequest(err);
    }
};

const parsePerson = async (req) => {
    const { personDetails, relationship } = req.payload;

    const details = personDetails && { details: personDetails };
    const relationships = relationship && { relationship: relationship };

    return {
        ...details,
        ...relationships,
    };
};

module.exports.parsePerson = parsePerson;
module.exports.verifyPersonExist = verifyPersonExist;