const Students = require('../models/StudentModel');
const { prepareInternalServerError, prepareSuccess } = require('./responses')


async function handle_request(msg, callback) {
    console.log("KafkaBackend::studenrProfile: Inside handlerequest");
    //console.log("In handle request:" + JSON.stringify(msg));
    //console.log(msg);
    //console.log("experience"+msg.experience);
    let resp = {};
    try{
    
    let student;
        if((msg.email.indexOf('@') > 1)){
            console.log("search criteria is email");
            student = await 
            Students.findOne({"email" : msg.email});
        }
        else{
            console.log("search criteria is id");
            student = await 
            Students.findOne({"_id" : msg.email});
        }
        
        console.log(JSON.stringify(student));
        if(!student){
            student = await Students.create(msg);
        }
        //console.log(student);
        resp = prepareSuccess({ "student": student });
        //console.log('inside handle request resp',resp);
        console.log("------------------------------");
        //resp = prepareSuccess({ ...resp._doc });
    } catch (err) {
        console.log("Error: " , err);
        resp = prepareInternalServerError();
    }

    
    console.log("KafkaBackend::studenrProfile: before call back")
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}