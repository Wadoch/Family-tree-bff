const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: String,
    username: {
        type: String,
        unique: true,
    },
    password: String,
    email: String,
}, {
    collection: 'users',
});

module.exports = userSchema;
