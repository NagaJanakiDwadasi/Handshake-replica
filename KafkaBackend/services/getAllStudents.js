const Students = require('../models/StudentModel');
const { prepareInternalServerError, prepareSuccess } = require('./responses')


async function handle_request(msg, callback) {
    console.log("KafkaBackEnd:getAllStudents::inside handlerequest");
    //console.log("In handle request:" + JSON.stringify(msg));
    //console.log(msg);
    //console.log("email"+msg.email);
    let resp = {};
    try {
        
        let students = await 
        Students.find(
            {}
        ).exec();
        resp = prepareSuccess({ "students": students });
        //console.log('resp:: studentProfileExperience::',resp);
        //resp = prepareSuccess({ ...resp._doc });
    } catch (err) {
        console.log("Error: " , err);
        resp = prepareInternalServerError();
    }

    
    console.log("getAllStudents:: before call back");
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}