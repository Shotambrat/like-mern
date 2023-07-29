// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: String
    },
    {
        timestamps: true,
    }
    )

module.exports = mongoose.model('User', UserSchema);