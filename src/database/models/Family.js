const mongoose = require('mongoose');

const familySchema = require('../schemas/familySchema');

const Family = mongoose.model('Family', familySchema);

module.exports = Family;