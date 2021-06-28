const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
        // required: true
    },
    last_name: {
        type: String,
        // required: true
    },
    gender: {
        type: String,
        // required: true
    },
    age: {
        type: Number,
        // required: true
    },
    type: {
        type: String,
        // required: true
    },
    cin: {
        type: String,
        // required: true
    },
    phone: {
        type: String,
        // required: true
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    school_level: {
        type: String,
        // required: true
    },
    job: {
        type: String,
        // required: true
    },
    adress: {
        type: String,
        // required: true
    },
    activation: {
        type: Boolean,
        default: false,
        // required: true
    },
 

}, {
    timestamps: true
});


const User = mongoose.model('User', UserSchema);
module.exports = User