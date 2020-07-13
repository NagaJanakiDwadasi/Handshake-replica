const Company = require('../models/CompanyModel');
const { prepareInternalServerError, prepareSuccess } = require('./responses')


async function handle_request(msg, callback) {
    console.log("KafkaBackend::companyDetails: Inside handlerequest");
    //console.log("In handle request:" + JSON.stringify(msg));
    //console.log(msg);
    //console.log("experience"+msg.experience);
    let resp = {};
    try {
        
        let company = await 
        Company.findOne(
            { _id: msg.id }
        ).exec();
        //console.log(student);
        resp = prepareSuccess({ "company": company });
        //console.log('inside handle request resp',resp);
        console.log("------------------------------");
        //resp = prepareSuccess({ ...resp._doc });
    } catch (err) {
        console.log("Error: " , err);
        resp = prepareInternalServerError();
    }

    
    console.log("KafkaBackend::companyDetails: before call back")
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}