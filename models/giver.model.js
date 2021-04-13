const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiverSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    cin: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    activation: {
        type: Boolean,
        default: false,
        required: true
    },
    action: {
        type: Schema.Types.ObjectId,
        ref: 'Action',
        required: true
    }

}, {
    timestamps: true
});


const Giver = mongoose.model('Giver', GiverSchema);
module.exports = Giver