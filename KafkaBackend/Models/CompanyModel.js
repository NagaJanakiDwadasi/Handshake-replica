const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var companySchema = new Schema({
    name: 
    {
        type: String, 
        required: true
    },
    email: 
    {
        type: String, 
        required: true,
        unique: true,
        dropDups: true
    },
    password:
    {
        type: String, 
        required: true
    },
    location:{
        type: String, 
        required: false
    },
    description:{
        type: String, 
        required: false
    },
    profilePicture : {
        type : String,
        default: ''
    }});



const companyModel = mongoose.model('company', companySchema);
module.exports = companyModel;