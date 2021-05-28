const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    first_name : {
        type : String, 
        required : true
    }, 
    last_name : {
        type : String, 
        required : true
    },
    email : {
        type: String,
        required : true
    },
    message : {
        type: String,
        max : 1000
    }
})
const Contact = mongoose.model('Contact' , ContactSchema)

module.exports = Contact;