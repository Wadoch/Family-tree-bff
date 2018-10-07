const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        lowercase: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
    registerData: {
        type: Date,
        default: Date.now,
    }
}, {
    collection: 'users',
});

module.exports = userSchema;
