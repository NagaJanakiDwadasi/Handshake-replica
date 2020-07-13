var express = require('express');
var router = express.Router();
var kafka = require('./../kafka/client');

const Company = require('../models/company');
const JobApplications = require('../models/jobApplications');
const Event = require('../models/event');
const EventRegistrations = require('../models/eventRegistrations');
const Student = require('../models/student');

router.get('/details/:id',(req, res) => {  
    //console.log("INSIDE NODE COMPANY get"+req)
        Company.findAll({
            where: {
                company_id: req.params.id
            },
            raw : true
          }).then(company => {
           // console.log("inside respnse:"+company);
            res.status(200).send(company[0]);
          }).catch((err) => {
            console.loge("catch");
            res.status(400).send(); 
          });
});

router.get('/detailsKafka/:id',(req, res) => {  
    console.log("INSIDE  get company details kafa ")
  let data = {
      "id" : req.params.id
  };
  kafka.make_request('getCompanyDetailsRequest','getCompanyDetailsResponse',data, function(err,results){
      console.log('in result get company details');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else get company details");
              res.status(200).send(results.company);
          }
      
  });
});

router.put('/updateApplicationStatus', (req, res) => {
 // console.log("-------------------------------REQ OBJECT-----------------------------")
 // console.log(req.body.data);
 // console.log("-------------------------END REQ OBJECT-----------------------------")
  JobApplications.update(
      {
          job_status: req.body.data.job_status
      },
      {
          where: {student_id : req.body.data.student_id, job_id : req.body.data.job_id}
      }
  ).then((result) => {
    //  console.log(result)   
      res.status(200).send(result);
  }).catch((err) => {
   //   console.log(err)
  });
});


router.put('/updateApplicationStatusKafka', (req, res) => {
    console.log("BackEnd:Kafka::inside updateApplicationStatusKafka")
    //let data = {"email":req.params.email};
    console.log(JSON.stringify(req.body));

    kafka.make_request('updateApplicationStatusRequest','updateApplicationStatusResponse',req.body, function(err,results){
        console.log('updateApplicationStatusKafka result:: after call back');
        //console.log(results);
        if (err){
            console.log("I mnnside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("updateApplicationStatusKafka:: sending result");
                res.status(200).send(results);
            }
        
    });
   });

router.put('/updateCompanyName/:id', (req, res) => {
 // console.log("-------------------------------REQ OBJECT-----------------------------")
//  console.log(req.body.data);
 // console.log("-------------------------END REQ OBJECT-----------------------------")
  Company.update(
      {
          company_name: req.body.data
      },
      {
          where: {company_id : req.params.id}
      }
  ).then((result) => {
    //  console.log(result)   
      res.status(200).send(result);
  }).catch((err) => {
      console.log(err)
  });
});

router.put('/updateCompanyContact/:id', (req, res) => {
//  console.log("-------------------------------REQ OBJECT-----------------------------")
//  console.log(req.body.data);
//  console.log("-------------------------END REQ OBJECT-----------------------------")
  Company.update(
      {
          email_id: req.body.data
      },
      {
          where: {company_id : req.params.id}
      }
  ).then((result) => {
    //  console.log(result)   
      res.status(200).send(result);
  }).catch((err) => {
      console.log(err)
  });
});

router.put('/updateCompanyLocation/:id', (req, res) => {
 // console.log("-------------------------------REQ OBJECT-----------------------------")
//  console.log(req.body.data);
//  console.log("-------------------------END REQ OBJECT-----------------------------")
  Company.update(
      {
          location: req.body.data
      },
      {
          where: {company_id : req.params.id}
      }
  ).then((result) => {
    //  console.log(result)   
      res.status(200).send(result);
  }).catch((err) => {
      console.log(err)
  });
});

router.put('/updateCompanyDescription/:id', (req, res) => {
  //console.log("-------------------------------REQ OBJECT-----------------------------")
 // console.log(req.body.data);
 // console.log("-------------------------END REQ OBJECT-----------------------------")
  Company.update(
      {
          description: req.body.data
      },
      {
          where: {company_id : req.params.id}
      }
  ).then((result) => {
   //   console.log(result)   
      res.status(200).send(result);
  }).catch((err) => {
      console.log(err)
  });
});

router.post('/createEvent/:id', (req,res) => {
    Event.create(
        {
            event_name : req.body.eventName,
            event_description : req.body.description,
            event_starttime : req.body.eventStartTime,
            event_endtime : req.body.eventEndTime,
            event_date : req.body.eventDate,
            event_location : req.body.eventLocation,
            event_eligibility : req.body.eventEligibility,
            company_id : req.params.id
        }
    ).then((result) => {
       // console.log(result)   
        Event.findAll({
            where: {
                company_id: req.params.id
            },
            raw : true
          }).then(events => {
          //  console.log(events);
            res.status(200).send(events);
          }).catch((err) => {
            res.status(400).send(); 
          });
    }).catch((err) => {
        console.log(err)
        res.status(400).send();
    });
});

router.get('/getEvents/:id',(req, res) => {  
    Event.findAll({
        where: {
            company_id: req.params.id
        },
        raw : true
      }).then(events => {
       // console.log(events);
        res.status(200).send(events);
      }).catch((err) => {
        res.status(400).send(); 
      });
});

router.get('/getRegistrations/:id',(req, res) => {  
    EventRegistrations.findAll({
        where: {
            event_id: req.params.id
        },
        raw : true
      }).then(events => {
       // console.log(events);
        Student.findAll(
            {
              where : {student_id : events[0].student_id}
            }
          ).then((students) => {
         //     console.log(students)
              res.status(200).send(students);
          }).catch((err) => {
              res.status(400).send();
          });
      }).catch((err) => {
        res.status(400).send(); 
      });
});

router.post('/getCompanyProfileKafka',(req, res) => {  
    console.log("BackEnd:Kafka::inside getCompanyProfile")
    //let data = {"email":req.params.email};
    console.log(JSON.stringify(req.body));

    kafka.make_request('postCompanyProfileRequest','postCompanyProfileResponse',req.body, function(err,results){
        console.log('getCompanyProfile result:: after call back');
        //console.log(results);
        if (err){
            console.log("I mnnside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("getCompanyProfile:: sending result");
                res.status(200).send(results);
            }
        
    });

    
});


module.exports = router;