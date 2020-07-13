var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var connection = new require('./kafka/Connection');
//var { mongoose } = new require('./config/mongoose');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

const { mongoDB } = require('./config/mongoose');
const mongoose = require('mongoose');
//const Students = require('./Models/StudentModel');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

//import kafka services
var studentProfileExperience = require('./services/studentProfileExperience');
var studentProfile = require('./services/studentProfile');
var studentProfileObjective = require('./services/studentProfileObjective');
var studentProfileSkillSet = require('./services/studentProfileSkillSet');
var studentProfileCity = require('./services/studentProfileCity');
var messageService = require('./services/messageService');
var getMessageService = require('./services/getMessageServices');
var getAllStudents=require('./services/getAllStudents');
var companyProfile = require('./services/companyProfile');
var jobService = require('./services/jobService');
var allJobsService = require('./services/allJobsService');
var allJobOpeningsService = require('./services/allJobOpeningsService');
var getCompanyDetailsService = require('./services/companyDetails');
var postApplyJobService = require('./services/postApplyJobService');
var getApplicantDetailsService =  require('./services/getApplicantDetailsService');
var updateApplicationStatusRequest = require('./services/updateApplicationStatusService');
//import kafka topics
const {
    POST_STUDENT_PROFILE_EXPERIENCE_REQUEST,
    GET_STUDENT_PROFILE_REQUEST,
    UPDATE_STUDENT_PROFILE_OBJECTIVE_REQUEST,
    UPDATE_STUDENT_PROFILE_SKILLSET_REQUEST,
    UPDATE_STUDENT_PROFILE_CITY_REQUEST,
    MESSAGE_REQUEST,
    GET_MESSAGE_REQUEST,
    GET_ALL_STUDENTS_REQUEST,
    POST_COMPANY_PROFILE_REQUEST,
    POST_JOB_REQUEST,
    ALL_JOBS_REQUEST,
    ALL_JOB_OPENINGS_REQUEST,
    GET_COMPANY_DETAILS_REQUEST,
    POST_APPLY_JOB_REQUEST,
    GET_APPLICANT_DETAILS_REQUEST,
    UPDATE_APPLICATION_STATUS_REQUEST
} = require('./kafka/topic');


function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('KafkaBackend:index.js:: observing ', topic_name, 'for request');
    consumer.on('message', function (message) {
        console.log('KafkaBackend:index.js::message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        //console.log("data after parsed::"+JSON.stringify(data));
        console.log("replyto::"+JSON.stringify(data.replyTo));
        console.log("--------------------");
        fname.handle_request(data.data, function (err, res) {
            //console.log('after handle' + JSON.stringify(res));
            console.log("KafkaBackend::index.js::handleTopicRequest::handle_request response :: from call back ");
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res.data
                    }),
                    partition: 0
                }
            ];
            //console.log('kaka backend response payload' + JSON.stringify(payloads));
            producer.send(payloads, function (err, data) {
                if (err) {
                    console.log(err);
                    console.log('producer failed');
                } else {
                    console.log("KafkaBackend:index.js::inside producer send")
                    console.log(data);
                }
            });
            return;
        });

    });
}


// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

handleTopicRequest(POST_STUDENT_PROFILE_EXPERIENCE_REQUEST, studentProfileExperience);
handleTopicRequest(GET_STUDENT_PROFILE_REQUEST, studentProfile);
handleTopicRequest(UPDATE_STUDENT_PROFILE_OBJECTIVE_REQUEST, studentProfileObjective);
handleTopicRequest(UPDATE_STUDENT_PROFILE_SKILLSET_REQUEST, studentProfileSkillSet);
handleTopicRequest(UPDATE_STUDENT_PROFILE_CITY_REQUEST, studentProfileCity);
handleTopicRequest(MESSAGE_REQUEST, messageService);
handleTopicRequest(GET_MESSAGE_REQUEST, getMessageService);
handleTopicRequest(GET_ALL_STUDENTS_REQUEST, getAllStudents);
handleTopicRequest(POST_COMPANY_PROFILE_REQUEST, companyProfile);
handleTopicRequest(POST_JOB_REQUEST, jobService);
handleTopicRequest(ALL_JOBS_REQUEST, allJobsService);
handleTopicRequest(ALL_JOB_OPENINGS_REQUEST, allJobOpeningsService);
handleTopicRequest(GET_COMPANY_DETAILS_REQUEST, getCompanyDetailsService);
handleTopicRequest(POST_APPLY_JOB_REQUEST, postApplyJobService);
handleTopicRequest(GET_APPLICANT_DETAILS_REQUEST, getApplicantDetailsService);
handleTopicRequest(UPDATE_APPLICATION_STATUS_REQUEST, updateApplicationStatusRequest);


//start your server on port 3001
//app.listen(3001, () => console.log("Server Listening on port 3001"));
