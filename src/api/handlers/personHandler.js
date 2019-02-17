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
        ...parsedPersonDetails,
        personId: personId,
        owner: userId,
        familyId,
    };

    try {
        const relationType = Object.keys(parsedPersonDetails.relationship)[0];
        const rel = await Person.findOne({ personId: parsedPersonDetails.relationship[relationType] });

        if(rel && relationType === 'partner') {
            rel.relationship[relationType] = personId;

            await rel.save();
        }
        else if(rel && relationType === 'parents') {
            const relPartnerId = rel.relationship.partner;
            const relPartner = await Person.findOne({personId: relPartnerId});

            rel.relationship.children.push(personId);
            relPartner.relationship.children.push(personId);
            personData.relationship.parents.push(relPartnerId);

            await relPartner.save();
            await rel.save();

        }

        const { familyId } = await addNewPerson(personData);

        const family = await Family.findOne({ familyId });
        family.people.push(personId);
        await family.save();

        return h.response({
            statusCode: 200,
            message: 'Person successfully added',
            data: {familyId},
        });
    } catch(err) {
        console.log(err);
        await Person.findOne({ personId }).deleteOne();
        return Boom.badRequest(err);
    }
};

const removeHandler = async (req, h) => {
    const { personId } = req.pre.person;

    try {
        const person = await Person.findOne({ personId });
        const family = await Family.findOne({ familyId: person.familyId});

        const keys = Object.keys(person.relationship);
        let num = 0;

        keys.forEach(e => {
            if(Array.isArray(person.relationship[e]) && person.relationship[e].length > 0) {
                num++;
            }
            else if (typeof person.relationship[e] === 'string' && person.relationship[e] !== '') {
                num++;
            }
        });

        if(num > 1) {
            throw new Error('can\'t remove this person');
        }

        if(person.relationship.parents.length > 0) {
            person.relationship.parents.forEach(async e => {
                const rel = await Person.findOne({ personId: e });
                rel.relationship.children = rel.relationship.children.filter(child => child !== personId);
                await rel.save();
            });
        }

        if(person.relationship.partner !== '') {
            const rel = await Person.findOne({ personId: person.relationship.partner });
            rel.relationship.partner = '';
            await rel.save();
        }

        if(family) {
            family.people = family.people.filter((e) =>  e !== personId);
            await family.save();
        }

        await Person.findOne({ personId }).deleteOne();

        return h.response({
            statusCode: 200,
            message: 'Person successfully removed',
            data: {familyId: person.familyId},
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