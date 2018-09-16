const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: Number,
    username: String,
    password: String,
    email: String,
});

module.exports = userSchema;
