const Jobs = require('../models/JobModel');
const { prepareInternalServerError, prepareSuccess } = require('./responses')


async function handle_request(msg, callback) {
    console.log("KafkaBackend::allJobsService: Inside handlerequest");
    let resp = {};
    try {
        
            let jobs = await Jobs.find({companyId : msg.company_id}).exec();
        //console.log(student);
        resp = prepareSuccess({ "job": jobs });
        //console.log('inside handle request resp',resp);
        console.log("------------------------------");
        //resp = prepareSuccess({ ...resp._doc });
    } catch (err) {
        console.log("Error: " , err);
        resp = prepareInternalServerError();
    }

    
    console.log("KafkaBackend::allJobsService: before call back")
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}