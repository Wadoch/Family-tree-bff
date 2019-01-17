const mongoose = require('mongoose');

const personSchema = require('../schemas/personSchema');

const Person = mongoose.model('Person', personSchema);

module.exports = Person;