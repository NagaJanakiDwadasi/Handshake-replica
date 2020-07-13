const Students = require('../models/StudentModel');
const { prepareInternalServerError, prepareSuccess } = require('./responses')


async function handle_request(msg, callback) {
    console.log("Inside kafka post Student profile Experience backend");
    console.log("In handle request:" + JSON.stringify(msg));
    console.log(msg);
    console.log("experience"+msg.experience);
    let resp = {};
    try {
        
        let student = await 
        Students.findOneAndUpdate(
            { email: msg.email },
            {
                $set: {
                    experience : msg.experience
                }
            },
            {new: true}
        ).exec();
        resp = prepareSuccess({ "student": student });
        console.log('resp:: studentProfileExperience::',resp);
        //resp = prepareSuccess({ ...resp._doc });
    } catch (err) {
        console.log("Error: " , err);
        resp = prepareInternalServerError();
    }

    
    
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}