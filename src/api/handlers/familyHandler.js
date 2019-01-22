const Boom = require('boom');
const uuid = require('uuid/v1');

const { Family, Person } = require('../../database/models');

const addNewFamily = async (familyData) => (
    new Family(familyData)
        .save()
        .catch(err => {
            console.log(err);
            throw err;
        })
);

const addHandler = async (req, h) => {
    const { userId } = req.pre.user;
    const familyName = req.pre.familyName;
    const { familyId: fId } = req.payload;

    const familyId = fId ? fId : uuid();
    const familyData = {
        familyId,
        owner: userId,
        name: familyName,
    };

    try {
        await addNewFamily(familyData);

        return h.response({
            statusCode: 200,
            message: 'Family successfully added',
            data: {
                familyId,
            }
        });
    } catch(err) {
        return Boom.badRequest(err);
    }
};

const editHandler = async (req, h) => {
    const { newName, familyId } = req.payload;

    try {
        const family = await Family.findOne({ familyId: familyId});
        family.name = newName;

        await family.save();

        return h.response({
            statusCode: 200,
            data: 'Family successfully edited'
        })
    } catch (err) {
        return Boom.badRequest(err);
    }
};

const removeHandler = async (req, h) => {
    const { familyId } = req.pre.family;

    try {
        const { people } = await Family.findOne({ familyId: familyId });

        people.forEach(async personId => {
            await Person.findOne({ personId }).deleteOne();
        });

        await Family.findOne({ familyId }).deleteOne();

        return h.response({
            statusCode: 200,
            data: 'Family successfully removed'
        })
    } catch (err) {
        return Boom.badRequest(err);
    }
};

const listHandler = async (req, h) => {
    const { userId } = req.pre.user;

    try {
        const families = await Family.find({ owner: userId });

        return h.response({
            statusCode: 200,
            data: {
                families: families,
            }
        });
    } catch (err) {
        return Boom.badRequest(err);
    }
};

const getHandler = async (req, h) => {
    const family = req.pre.family;
    const enrichedFamily = family;


    try {
        const people = family.people.map(async personId => await Person.findOne({ personId }));

        return Promise.all(people)
            .then(data => {
                return h.response({
                    statusCode: 200,
                    data: {
                        family: {
                            people: data,
                            name: enrichedFamily.name,
                            familyId: enrichedFamily.familyId,
                            owner: enrichedFamily.owner,
                            createdData: enrichedFamily.createdData,
                        },
                    }
                });

            });
    } catch (err) {
        return Boom.badRequest(err);
    }
};

module.exports.addHandler = addHandler;
module.exports.editHandler = editHandler;
module.exports.removeHandler = removeHandler;
module.exports.listHandler = listHandler;
module.exports.getHandler = getHandler;