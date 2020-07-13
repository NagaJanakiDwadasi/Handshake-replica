const Jobs = require('../models/JobModel');
const { prepareInternalServerError, prepareSuccess } = require('./responses')


async function handle_request(msg, callback) {
    console.log("KafkaBackend::jobService: Inside handlerequest");
    let resp = {};
    try {
        
            let job = await Jobs.create(msg);
            let jobs = await Jobs.find({}).exec();
        //console.log(student);
        resp = prepareSuccess({ "job": jobs });
        //console.log('inside handle request resp',resp);
        console.log("------------------------------");
        //resp = prepareSuccess({ ...resp._doc });
    } catch (err) {
        console.log("Error: " , err);
        resp = prepareInternalServerError();
    }

    
    console.log("KafkaBackend::jobService: before call back")
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}