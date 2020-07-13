const JobApplications = require('../models/JobApplicationsModel');
const { prepareInternalServerError, prepareSuccess } = require('./responses')


async function handle_request(msg, callback) {
    console.log("KafkaBackend::updateApplicationStatus: Inside handlerequest");
    let resp = {};
    try {
        console.log("msg::"+JSON.stringify(msg));
            let jobApplication = await 
            JobApplications.findOneAndUpdate(
            { _id: msg.id },
            {
                $set: {
                    jobStatus : msg.jobStatus
                }
            },
            {new: true}
        ).exec();
          //console.log("after update::"+JSON.stringify(jobApplication));
        let jobApplications = await 
            JobApplications.find({}).exec(); 
        //console.log(student);
        resp = prepareSuccess({ "jobApplication": jobApplications });
        console.log('inside handle request resp',resp);
        console.log("------------------------------");
        //resp = prepareSuccess({ ...resp._doc });
    } catch (err) {
        console.log("Error: " , err);
        resp = prepareInternalServerError();
    }

    
    console.log("KafkaBackend::updateApplicationStatus: before call back")
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}