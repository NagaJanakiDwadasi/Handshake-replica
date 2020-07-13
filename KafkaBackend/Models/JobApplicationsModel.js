const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var jobApplicationsSchema = new Schema({
    jobId: 
    {
        type: String, 
        required: true
    },
    companyId: 
    {
        type: String, 
        required: true,
    },
    studentId:
    {
        type: String, 
        required: true
    },
    resume:{
        type: Object, 
        required: true
    },
    jobStatus:{
        type: String, 
        required: true
    },
    studentName:{
        type : String,
        required : true
    }
});



const jobApplicationsModel = mongoose.model('jobApplications', jobApplicationsSchema);
module.exports = jobApplicationsModel;