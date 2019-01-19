const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    personId: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    familyId: {
        type: String,
        required: true,
    },
    details: {
        firstName: String,
        surname: String,
        birthDate: Date,
        deathDate: Date,
        gender: String,
        additionalInfo: String,
    },
    relationship: {
        parents: [String],
        children: [String],
        partner: String,
    },
    createdData: {
        type: Date,
        default: Date.now,
    }
}, {
    collection: 'people',
});

module.exports = personSchema;
