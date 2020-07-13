var express = require('express');
var router = express.Router();

const Student = require('../models/student');
const Company = require('../models/company');
const Login = require('../models/login');

//Route to register a student
router.post('/student',(req, res) => {  
    console.log("INSIDE NODE STUDENT POST")
    Student.create({
        student_name: req.body.name,
        email_id: req.body.email,
        password: req.body.password,
        college_name: req.body.college
    }).then((result) => {
        console.log("inside student result");
        Login.create({
            email_id : req.body.email,
            password : req.body.password,
            profile : 'Student',
            status : 'Active'
        }).then((result) => {
            res.status(200).send(); 
        }).catch((err) => {
            res.status(400).send();    
        });
    }).catch((err) => {
        console.log(err);
        res.status(400).send();
    });
});

//Route to register a company
router.post('/company',function(req,res){
    Company.create({
        company_name: req.body.name,
        email_id: req.body.email,
        password: req.body.password,
        location: req.body.location
    }).then((result) => {
        console.log("inside company result");
        Login.create({
            email_id : req.body.email,
            password : req.body.password,
            profile : 'Company',
            status : 'Active'
        }).then((result) => {
            res.status(200).send(); 
        }).catch((err) => {
            res.status(400).send();    
        });
    }).catch((err) => {
        console.log(err);
        res.status(400).send();
    });
});

module.exports = router;
