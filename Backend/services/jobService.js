var express = require('express');
var router = express.Router();
var kafka = require('./../kafka/client');

var multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    }
});
var upload = multer({ storage: storage });
var fs = require('file-system');

const Job = require('../models/job');
const Company = require('../models/company');
const JobApplications = require('../models/jobApplications');
const Student = require('../models/student');


router.post('/opening',(req, res) => {  
    console.log("INSIDE NODE JOB POST")
    console.log(req.body.title);
    console.log(req.body.deadline);
    console.log(req.body.salary);
    var today = new Date();
    console.log(today.toISOString().slice(0,10));
    Job.create({
        title: req.body.title,
        posting_date: req.body.posting_date,
        deadline: req.body.deadline,
        location: req.body.location,
        salary: req.body.salary,
        job_type: req.body.job_type,
        description: req.body.description,
        company_id: req.body.company_id,
        posting_date: today.toISOString().slice(0,10)
    }).then((result) => {
        Job.findAll({
            where: {
                company_id: req.body.company_id
            },
            raw : true
          }).then(company => {
            console.log(company);
            res.status(200).send(company);
          }).catch((err) => {
            res.status(400).send(); 
          });
    }).catch((err) => {
        console.log(err);
        res.status(400).send();
    });
});


router.post('/openingKafka',(req, res) => {  
  console.log("INSIDE NODE JOB POST Kafka")
  console.log(req.body);
  var today = new Date();
  
  let payload = {
    title : req.body.title,
    postingDate : today.toISOString().slice(0,10),
    deadline : req.body.deadline,
    location : req.body.location,
    salary : req.body.salary,
    jobType : req.body.job_type,
    description : req.body.description,
    companyId: req.body.company_id,
    companyName: req.body.company_name

  }
  console.log(JSON.stringify(payload));

  kafka.make_request('postJobRequest','postJobResponse',payload, function(err,results){
      console.log('openingKafka result:: after call back');
      //console.log(results);
      if (err){
          console.log("I mnnside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("openingKafka:: sending result");
              res.status(200).send(results);
          }
      
  });

});



router.get('/jobOpenings/:id',(req, res) => {  
    console.log("INSIDE NODE JOB get")
        Job.findAll({
            where: {
                company_id: req.params.id
            },
            raw : true
          }).then(company => {
            console.log("inside respnse:"+company);
            res.status(200).send(company);
          }).catch((err) => {
            console.loge("catch");
            res.status(400).send(); 
          });
});


router.get('/jobOpeningsKafka/:id',(req, res) => {  
  console.log("INSIDE NODE ALL JOB APPLICANTS Kafka")
  let data = {
    jobId : req.params.id
  };
  console.log(data);
  kafka.make_request('getApplicantDetailsRequest','getApplicantDetailsResponse',data, function(err,results){
      console.log('getApplicantDetailsResponse result:: after call back');
      //console.log(results);
      if (err){
          console.log("I mnnside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("openingKafka:: sending result");
              res.status(200).send(results);
          }
      
  });
});


router.get('/allJobOpenings',(req, res) => {  
  console.log("INSIDE NODE ALLJOBOPENINGS get")
      Job.findAll({include : [{
        model:Company
      }]}).then(result => {
         // console.log("inside respnse:"+company);
          const resObj = result.map(job => {

            //tidy up the user data
            return Object.assign(
              {},
              {
                job_id: job.job_id,
                title: job.title,
                location: job.location,
                job_type: job.job_type,
                description: job.description,
                company_name: job.company.company_name,
                company_id : job.company.company_id
              }
            )
          });
          console.log("inside respnse:"+resObj);
          res.status(200).send(resObj);
        }).catch((err) => {
          console.log("catch::"+err);
          res.status(400).send(); 
        });
});


router.get('/allJobOpeningsKafka/:id',(req, res) => {  
  console.log("INSIDE NODE ALL JOBS GET Kafka")
  let data = {
    company_id : req.params.id
  };
  console.log(data);
  kafka.make_request('getAllJobsRequest','getAllJobsResponse',data, function(err,results){
      console.log('getAllJobsResponse result:: after call back');
      //console.log(results);
      if (err){
          console.log("I mnnside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("openingKafka:: sending result");
              res.status(200).send(results);
          }
      
  });
});


router.get('/allJobOpeningsKafka',(req, res) => {  
  console.log("INSIDE NODE ALL JOBS GET Kafka")
  //console.log(data);
  kafka.make_request('getAllJobOpeningsRequest','getAllJobOpeningsResponse',req.body, function(err,results){
      console.log('getAllJobOpeningsResponse result:: after call back');
      //console.log(results);
      if (err){
          console.log("I mnnside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("getAllJobOpeningsResponse:: sending result");
              res.status(200).send(results);
          }
      
  });
});

router.post('/ApplyJob/', upload.single('file'),(req,res) => {
  console.log(req.body.student_id);
  var imageData = fs.readFileSync(req.file.path);
  JobApplications.findAll( {
    where : 
    {
      student_id : req.body.student_id,
      job_id : req.body.job_id
    }
  }).then((result) => {
    console.log(result) 
    if(result.length === 0){
      JobApplications.create(
        {
          job_id: req.body.job_id,
          company_id : req.body.company_id,
          student_id: req.body.student_id,
          resume: imageData,
          job_status: req.body.job_status
        }
    ).then((result) => {
        console.log(result) 
        res.status(200).send();  
    }).catch((err) => {
        console.log("Failed while inserting:"+err)
        res.status(400).send();
    });
    }
    else{
      console.log("Already applied");
      res.status(201).send();  
    }
  }).catch((err) => {
    console.log("Failed while fetching:"+err)
    res.status(400).send();
  });


  


  
});


router.post('/ApplyJobKafka/', upload.single('file'),(req,res) => {
  console.log(req.body.student_id);
  console.log(req.file.path);
  var imageData = fs.readFileSync(req.file.path);
  var data={
          jobId: req.body.job_id,
          companyId : req.body.company_id,
          studentId: req.body.student_id,
          resume: imageData,
          jobStatus: req.body.job_status,
          studentName : req.body.student_name
        };
    
        console.log(JSON.stringify(data.jobId));
        console.log(JSON.stringify(data.companyId));
        console.log(JSON.stringify(data.studentId));

        kafka.make_request('postApplyJobRequest','postApplyJobResponse',data, function(err,results){
            console.log('openingKafka result:: after call back');
            //console.log(results);
            if (err){
                console.log("I mnnside err");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{
                console.log("openingKafka:: sending result");
                    res.status(200).send(results);
                }
            
        });


});


router.get('/getAppliedJobs/:id', (req, res) => {
  console.log("-------------------------------REQ OBJECT-----------------------------")
  console.log(req.body);
  console.log("-------------------------END REQ OBJECT-----------------------------")
  JobApplications.findAll({
    include : [{
      model:Job
    }, {
      model:Company
    }],
    where : 
    {
      student_id : req.params.id
    }
  }).then((jobApplications) => {
      console.log(jobApplications.length)
      const resObj = jobApplications.map(jobApplication => {

        //tidy up the user data
        return Object.assign(
          {},
          {
            title: jobApplication.job.title,
            location: jobApplication.job.location,
            company_name: jobApplication.company.company_name,
            status: jobApplication.job_status,
            date: jobApplication.createdAt.toISOString().slice(0,10)
          }
        )
      });
      console.log("inside respnse:"+resObj);
      res.status(200).send(resObj);
  }).catch((err) => {
      res.status(400).send();
  });

});

router.get('/getJobApplications/:id', (req, res) => {
  console.log("-------------------------------REQ OBJECT-----------------------------")
  console.log(req.body);
  console.log("-------------------------END REQ OBJECT-----------------------------")
  JobApplications.findAll({
    include : [{
      model:Student
    }],
    where : 
    {
      job_id : req.params.id
    }
  }).then((jobApplications) => {
      console.log(jobApplications.length)
      const resObj = jobApplications.map(jobApplication => {

        //tidy up the user data
        return Object.assign(
          {},
          {
            student_name: jobApplication.student.student_name,
            student_id: jobApplication.student_id,
            resume: new Buffer(jobApplication.resume).toString('base64'),
            job_status : jobApplication.job_status
          }
        )
      });
      console.log("inside respnse:"+resObj);
      res.contentType('application/pdf');
      res.status(200).send(resObj);
  }).catch((err) => {
      res.status(400).send();
  });

});



module.exports = router;