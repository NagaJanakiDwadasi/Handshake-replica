const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var jobSchema = new Schema({
    title: 
    {
        type: String, 
        required: true
    },
    postingDate: 
    {
        type: Date, 
        required: true,
    },
    deadline:
    {
        type: Date, 
        required: true
    },
    location:{
        type: String, 
        required: true
    },
    salary:{
        type: Number, 
        required: false
    },
    jobType : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required: false
    },
    companyId:{
        type: String,
        required : true
    },
    companyName:{
        type: String,
        required : true
    }


});



const jobModel = mongoose.model('job', jobSchema);
module.exports = jobModel;