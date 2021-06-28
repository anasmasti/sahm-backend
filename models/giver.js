const { string } = require('joi');
const mongoose =  require('mongoose');


const giverSchema = mongoose.Schema({
    Nom : String ,
    Prenom : String ,
    Cin : String ,
    tel : String,
    email: String
});

module.exports = mongoose.model('giver',giverSchema);

