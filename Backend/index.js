//import the dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var path = require('path');
app.set('view engine', 'ejs');
//use cors to allow cross origin resource sharing
app.use(cors({ origin: '', credentials: true })); 
app.use(bodyParser.json());
//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//import db dependencies
const sequelize = require('./util/database');
const company = require('./models/company');
const student = require('./models/student');
const job = require('./models/job');
const studentAddress = require('./models/studentAddress');
const login = require('./models/login');
const studentEducation = require('./models/studentEducation');
const studentExperience = require('./models/studentExperience');
const jobApplications = require('./models/jobApplications');
const event = require('./models/event');
const eventRegistrations = require('./models/eventRegistrations');


//Define Services
const signupService = require('./services/signupService');
const loginService = require('./services/loginService');
const studentProfileService = require('./services/studentProfileService');
const jobService = require('./services/jobService');
const companyService = require('./services/companyService');
const studentsService = require('./services/studentsTabService');
const messagesService = require('./services/messagesService');


job.belongsTo(company, {foreignKey: 'company_id'});
jobApplications.belongsTo(job, {foreignKey: 'job_id'});
jobApplications.belongsTo(company, {foreignKey: 'company_id'});
jobApplications.belongsTo(student, {foreignKey: 'student_id'});
eventRegistrations.belongsTo(event, {foreignKey: 'event_id'});
eventRegistrations.belongsTo(student, {foreignKey: 'student_id'});

//Define Routes
var basePath = '/';
var signupPath = '/signUp';
var loginPath = '/login';
var jobPath ='/job';
var studentProfilePath = '/student';
var companyPath='/company';
var studentsPath = '/students';
var messagesPath = '/messages';


// Routes --> Services
app.use(signupPath, signupService);
app.use(loginPath, loginService);
app.use(studentProfilePath, studentProfileService);
app.use(jobPath, jobService);
app.use(companyPath, companyService);
app.use(studentsPath, studentsService);
app.use(messagesPath, messagesService);
//app.use('/uploads', express.static(path.join(__dirname, '/uploads/')));

//sync database
company.sync();
student.sync();
studentAddress.sync();
login.sync();
job.sync();
event.sync();
eventRegistrations.sync();
studentEducation.sync();
studentExperience.sync();
jobApplications.sync();
sequelize.sync().then(result => {}). catch(err => {});

//start server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");