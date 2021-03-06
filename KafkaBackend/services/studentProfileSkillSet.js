const Students = require('../models/StudentModel');
const { prepareInternalServerError, prepareSuccess } = require('./responses')


async function handle_request(msg, callback) {
    console.log("KafkaBackEnd:studentProfileSkillSet::inside handlerequest");
    //console.log("In handle request:" + JSON.stringify(msg));
    //console.log(msg);
    //console.log("email"+msg.email);
    let resp = {};
    try {
        
        let student = await 
        Students.findOneAndUpdate(
            { email: msg.email },
            {
                $set: {
                    skillSet : msg.skillSet
                }
            },
            {new: true}
        ).exec();
        resp = prepareSuccess({ "student": student });
        //console.log('resp:: studentProfileExperience::',resp);
        //resp = prepareSuccess({ ...resp._doc });
    } catch (err) {
        console.log("Error: " , err);
        resp = prepareInternalServerError();
    }

    
    console.log("studentprofileoSkillSet:: before call back");
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}