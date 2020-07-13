const JobApplications = require('../models/JobApplicationsModel');
const { prepareInternalServerError, prepareSuccess } = require('./responses')


async function handle_request(msg, callback) {
    console.log("KafkaBackend::getApplicantDetails: Inside handlerequest");
    let resp = {};
    try {
        
            let jobApplications = await JobApplications.find({jobId:msg.jobId}).exec();
          
        //console.log(student);
        resp = prepareSuccess({ "jobApplication": jobApplications });
        console.log('inside handle request resp',resp);
        console.log("------------------------------");
        //resp = prepareSuccess({ ...resp._doc });
    } catch (err) {
        console.log("Error: " , err);
        resp = prepareInternalServerError();
    }

    
    console.log("KafkaBackend::getApplicantDetails: before call back")
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}