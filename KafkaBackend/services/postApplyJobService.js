const JobApplications = require('../models/JobApplicationsModel');
const { prepareInternalServerError, prepareSuccess } = require('./responses')


async function handle_request(msg, callback) {
    console.log("KafkaBackend::jobApplicationsService: Inside handlerequest");
    let resp = {};
    try {
        
            let jobApplication = await JobApplications.create(msg);
          
        //console.log(student);
        resp = prepareSuccess({ "jobApplication": jobApplication });
        console.log('inside handle request resp',resp);
        console.log("------------------------------");
        //resp = prepareSuccess({ ...resp._doc });
    } catch (err) {
        console.log("Error: " , err);
        resp = prepareInternalServerError();
    }

    
    console.log("KafkaBackend::jobApplicationsService: before call back")
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}