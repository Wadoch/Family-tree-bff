const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: String,
    username: String,
    password: String,
    email: String,
}, {
    collection: 'users',
});

module.exports = userSchema;
