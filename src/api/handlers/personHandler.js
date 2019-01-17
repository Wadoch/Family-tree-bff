const Boom = require('boom');
const uuid = require('uuid/v1');

const { Family } = require('../../database/models');

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

    const familyData = {
        familyId: uuid(),
        owner: userId,
        name: familyName,
    };

    try {
        await addNewFamily(familyData);

        return h.response({
            statusCode: 200,
            data: 'Family successfully added'
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
        await Family.find({ familyId: familyId}).deleteOne();

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
        const families = await Family.find({owner: userId});

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


module.exports.addHandler = addHandler;
module.exports.editHandler = editHandler;
module.exports.removeHandler = removeHandler;
module.exports.listHandler = listHandler;