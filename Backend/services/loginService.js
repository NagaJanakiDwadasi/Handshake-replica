var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const Login = require('../models/login');
const Student = require('../models/student');
const Company = require('../models/company');

//Route to register a student
router.post('/student',(req, res) => {  
    console.log("INSIDE NODE STUDENT LOGIN")
    Login.findAll({
        where: {
            email_id: req.body.email,
            password: req.body.password,
            profile: 'Student',
            status: 'Active'
        }
      }).then((result) => {
        if(result.length==0)
        {
          res.status(400).send(); 
        }
        else {
          let response = {}
            Student.findAll({
              where: {
                  email_id: req.body.email
              },
              raw : true
            }).then(student => {
              console.log(student[0]);
              //Token
              var token = {
                  isLoggedIn : true,
                  user : student[0].student_id,
                  userName : student[0].student_name,
                  email: student[0].email_id,
                  major : student[0].major
              }
              // JWT Token
              var jwt_token = jwt.sign(token, "handshake", {
                  expiresIn: 86400 // in seconds
              });
              response.token = jwt_token;  
              response.userId = token.user;
              response.userName = token.userName;
              response.email = token.email;
              response.major=token.major;
              console.log(student[0].student_id)      
              console.log(token)
              console.log(jwt_token)
              res.status(200).send(response);
            })
            console.log("-----------------------------------")
            //Response
        }
      }).catch((err) => {
        res.status(400).send(); 
      });
});

//Route to register a company
router.post('/company',function(req,res){
    console.log("INSIDE NODE COMPANY LOGIN")
    console.log(req.body)
    Login.findAll({
        where: {
            email_id: req.body.email,
            password: req.body.password,
            profile: 'Company',
            status: 'Active'
        }
      }).then((result) => {
        let response = {};
        if(result.length==0)
        {
          res.status(400).send(); 
        }
        else {
          console.log("inside else before fetching company details");
          Company.findAll({
            where: {
                email_id: req.body.email
            },
            raw : true
          }).then(company => {
            console.log(company[0]);
            //Token
            var token = {
                isLoggedIn : true,
                user : company[0].company_id,
                userName : company[0].company_name,
                email: company[0].email_id
            }
            // JWT Token
            var jwt_token = jwt.sign(token, "handshake", {
                expiresIn: 86400 // in seconds
            });
            response.token = jwt_token;  
            response.userId = token.user;
            response.userName = token.userName;
            response.email = token.email;
            console.log(company[0].company_id)      
            console.log(token)
            console.log(jwt_token)
            res.status(200).send(response);
          })          
        }
      }).catch((err) => {
        res.status(400).send(); 
      });
});

module.exports = router;