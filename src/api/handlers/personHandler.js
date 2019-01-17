const Boom = require('boom');
const uuid = require('uuid/v1');

const { Person, Family } = require('../../database/models');

const addNewPerson = async (personData) => (
    new Person(personData)
        .save()
        .catch(err => {
            console.log(err);
            throw err;
        })
);

const addHandler = async (req, h) => {
    const { familyId } = req.payload;
    const { userId } = req.pre.user;
    const parsedPersonDetails = req.pre.parsePerson;

    const personId = uuid();
    const personData = {
        personId: personId,
        owner: userId,
        familyId: familyId,
        ...parsedPersonDetails
    };

    try {
        const { familyId } = await addNewPerson(personData);

        const family = await Family.findOne({ familyId });
        family.people.push(personId);
        await family.save();

        return h.response({
            statusCode: 200,
            data: 'Person successfully added'
        });
    } catch(err) {
        await Person.findOne({ personId }).deleteOne();
        return Boom.badRequest(err);
    }
};

const removeHandler = async (req, h) => {
    const { personId } = req.pre.person;

    try {
        const person = await Person.findOne({ personId });
        const family = await Family.findOne({ familyId: person.familyId});

        if(family) {
            family.people = family.people.filter((e) =>  e !== personId);
            await family.save();
        }

        await Person.findOne({ personId }).deleteOne();

        return h.response({
            statusCode: 200,
            data: 'Person successfully removed'
        })
    } catch (err) {
        return Boom.badRequest(err);
    }
};

const getHandler = async (req, h) => {
    try {
        return h.response({
            statusCode: 200,
            data: {
                person: req.pre.person,
            }
        });
    } catch (err) {
        return Boom.badRequest(err);
    }
};

const listHandler = async (req, h) => {
    const { userId } = req.pre.user;

    try {
        const people = await Person.find({owner: userId});

        return h.response({
            statusCode: 200,
            data: {
                people,
            }
        });
    } catch (err) {
        return Boom.badRequest(err);
    }
};


module.exports.addHandler = addHandler;
module.exports.removeHandler = removeHandler;
module.exports.listHandler = listHandler;
module.exports.getHandler = getHandler;