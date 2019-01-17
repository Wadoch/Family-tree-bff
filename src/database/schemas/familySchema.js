const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familySchema = new Schema({
    familyId: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    createdData: {
        type: Date,
        default: Date.now,
    },
    people: [String],
}, {
    collection: 'families',
});

module.exports = familySchema;
