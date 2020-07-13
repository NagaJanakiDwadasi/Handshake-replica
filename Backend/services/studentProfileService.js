var express = require('express');
var router = express.Router();
var multer = require('multer')
var kafka = require('./../kafka/client');
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    }
});
var upload = multer({ storage: storage });
var fs = require('file-system');
//var jwt = require('jsonwebtoken');

const Student = require('../models/student');
const StudentAddress = require('../models/studentAddress');
const StudentEducation = require('../models/studentEducation');
const StudentExperience = require('../models/studentExperience');

router.put('/profileUpdateObjective/:email', (req, res) => {
    //("-------------------------------REQ OBJECT-----------------------------")
  //  console.log(req.body.objective);
  //  console.log("-------------------------END REQ OBJECT-----------------------------")
    Student.update(
        {
            career_objectives: req.body.objective
        },
        {
            where: {email_id : req.params.email}
        }
    ).then((result) => {
        console.log(result)   
    }).catch((err) => {
        console.log(err)
    });
});

router.put('/profileUpdateSkillset/:email', (req, res) => {
 //   console.log("-------------------------------REQ OBJECT-----------------------------")
//    console.log(req.body.skillSet);
 //   console.log("-------------------------END REQ OBJECT-----------------------------")
    Student.update(
        {
            skillset: req.body.skillSet
        },
        {
            where: {email_id : req.params.email}
        }
    ).then((result) => {
        console.log(result)   
    }).catch((err) => {
        console.log(err)
    });
});



router.put('/profileUpdateExperience/:id', (req, res) => {
 //   console.log("-------------------------------REQ OBJECT-----------------------------")
 //   console.log(req.body);
 //   console.log("-------------------------END REQ OBJECT-----------------------------")
    StudentExperience.findAll(
        {
            where : {student_id : req.params.id}
        }
    ).then((studentRecords) => {
    //    console.log(studentRecords)
        if(studentRecords.length==0)
        {
   //     console.log("-------------------------------SELECTS RETURNS NO RECORDS-----------------------------")
        StudentExperience.create({
                student_id: req.params.id,
                company_name: req.body.company_name,
                    title: req.body.title,
                    location: req.body.location,
                    start_date: req.body.start_date,
                    end_date: req.body.end_date,
                    work_description: req.body.work_description

            }).then((result) => {
        //    console.log("-------------------------------CREATE SUCCESS-----------------------------")
        //        console.log(result)
                res.status(200).send();
            }).catch((err) => {
                res.status(400).send();
            });
        }
        else {
          //  console.log("-------------------------------SELECTS HAS RECORDS-----------------------------")
            let companyNameVar = (req.body.company_name) ? req.body.company_name : studentRecords[0].company_name;
            let titleVar = (req.body.title) ? req.body.title : studentRecords[0].title;
            let locationVar = (req.body.location) ? req.body.location : studentRecords[0].location;
            let start_dateVar = (req.body.start_date) ? req.body.start_date : studentRecords[0].start_date;
            let end_dateVar = (req.body.end_date) ? req.body.end_date : studentRecords[0].end_date;
            let work_descriptionVar = (req.body.work_description) ? req.body.work_description : studentRecords[0].work_description;
          //  console.log("-------------------------------UPDATE OBJECT IS-----------------------------")
         //   console.log(companyNameVar);
         //   console.log(titleVar);
         //   console.log(locationVar);
         //   console.log(start_dateVar);
         //   console.log(end_dateVar);
         //   console.log(work_descriptionVar);
         //   console.log("-------------------------END REQ OBJECT-----------------------------")
            StudentExperience.update(
                {
                    company_name: companyNameVar,
                    title: titleVar,
                    location: locationVar,
                    start_date: start_dateVar,
                    end_date: end_dateVar,
                    work_description: work_descriptionVar
                },
                {
                    where: {student_id : req.params.id}
                
            }).then((result) => {
          //      console.log("-------------------------------UPDATE SUCCESS-----------------------------")
           //     console.log(result)
                StudentExperience.findAll(
                    {
                        where : {student_id : req.params.id}
                    }
                ).then((studentExperienceRecords) => {
            //        console.log(studentExperienceRecords[0])
                    res.status(200).send(studentExperienceRecords[0]);
                }).catch((err) => {
                    res.status(400).send();
                });
            }).catch((err) => {
           //     console.log("-------------------------------UPDATE FAILED-----------------------------")
                res.status(400).send();
            });
            //res.status(200).send(response);
        }
    }).catch((err) => {
        res.status(400).send();
    });

});

router.put('/profileUpdateEducation/:id', (req, res) => {
  //  console.log("-------------------------------REQ OBJECT-----------------------------")
  //  console.log(req.body);
 //   console.log("-------------------------END REQ OBJECT-----------------------------")
    StudentEducation.findAll(
        {
            where : {student_id : req.params.id}
        }
    ).then((studentRecords) => {
        console.log(studentRecords)
        if(studentRecords.length==0)
        {
      //  console.log("-------------------------------SELECTS RETURNS NO RECORDS-----------------------------")
        StudentEducation.create({
                student_id: req.params.id,
                college_name: req.body.college_name,
                degree: req.body.degree,
                location: req.body.location,
                major: req.body.major,
                year_of_passing: req.body.year_of_passing,
                cgpa: req.body.cgpa

            }).then((result) => {
        //    console.log("-------------------------------CREATE SUCCESS-----------------------------")
         //       console.log(result)
                res.status(200).send();
            }).catch((err) => {
                res.status(400).send();
            });
        }
        else {
        //    console.log("-------------------------------SELECTS HAS RECORDS-----------------------------")
            let collegeNameVar = (req.body.college_name) ? req.body.college_name : studentRecords[0].college_name;
            let degreeVar = (req.body.degree) ? req.body.degree : studentRecords[0].degree;
            let locationVar = (req.body.location) ? req.body.location : studentRecords[0].location;
            let majorVar = (req.body.major) ? req.body.major : studentRecords[0].major;
            let yopVar = (req.body.year_of_passing) ? req.body.year_of_passing : studentRecords[0].year_of_passing;
            let cgpaVar = (req.body.cgpa) ? req.body.cgpa : studentRecords[0].cgpa;
        //    console.log("-------------------------------UPDATE OBJECT IS-----------------------------")
        //    console.log(collegeNameVar);
        //    console.log(degreeVar);
         //   console.log(locationVar);
        //   console.log(majorVar);
        //    console.log(yopVar);
         //   console.log(cgpaVar);
          //  console.log("-------------------------END REQ OBJECT-----------------------------")
            StudentEducation.update(
                {
                    college_name: collegeNameVar,
                    degree: degreeVar,
                    location: locationVar,
                    major: majorVar,
                    year_of_passing: yopVar,
                    cgpa: cgpaVar
                },
                {
                    where: {student_id : req.params.id}
                
            }).then((result) => {
            //    console.log("-------------------------------UPDATE SUCCESS-----------------------------")
             //   console.log(result)
                StudentEducation.findAll(
                    {
                        where : {student_id : req.params.id}
                    }
                ).then((studentEducationRecords) => {
              //      console.log(studentEducationRecords[0])
                    res.status(200).send(studentEducationRecords[0]);
                }).catch((err) => {
                    res.status(400).send();
                });
            }).catch((err) => {
             //   console.log("-------------------------------UPDATE FAILED-----------------------------")
                res.status(400).send();
            });
            //res.status(200).send(response);
        }
    }).catch((err) => {
        res.status(400).send();
    });

});





router.get('/profileGetEducation/:id', (req, res) => {
  //  console.log("-------------------------------REQ OBJECT-----------------------------")
  //  console.log(req.body);
  //  console.log("-------------------------END REQ OBJECT-----------------------------")
    StudentEducation.findAll(
        {
            where : {student_id : req.params.id}
        }
    ).then((studentRecords) => {
   //     console.log("-------------------------Education-----------------------------")
    //    console.log("Education::"+studentRecords)
   //     console.log("-------------------------Education-----------------------------")
        res.status(200).send(studentRecords[0]);
    }).catch((err) => {
        res.status(400).send();
    });

});



router.get('/fetchStudentExperienceDetails/:id', (req, res) => {
   // console.log("-------------------------------REQ OBJECT-----------------------------")
   // console.log(req.body);
   // console.log("-------------------------END REQ OBJECT-----------------------------")
    StudentExperience.findAll(
        {
            where : {student_id : req.params.id}
        }
    ).then((studentExperienceRecords) => {
       // console.log(studentExperienceRecords[0])
        res.status(200).send(studentExperienceRecords);
    }).catch((err) => {
        res.status(400).send();
    });

});



router.post('/profileUpdatePicture/:id', upload.single('file'),(req,res) => {
    var imageData = fs.readFileSync(req.file.path);
    Student.update(
        {
            profile_picture: imageData
        },
        {
            where: {student_id : req.params.id}
        }
    ).then((result) => {
        console.log(result)   
    }).catch((err) => {
        console.log(err)
    });

    res.status(200).send();
});

router.get('/profilePicture/:id', (req, res) => {
  //  console.log("-------------------------------REQ OBJECT-----------------------------")
 //   console.log(req.body);
//    console.log("-------------------------END REQ OBJECT-----------------------------")
    Student.findAll(
        // {
        //     attributes: ['profile_picture']
        // },
        {
            where : {student_id : req.params.id}
        }
    ).then((result) => {
  //      console.log("-----------------------PICTURE OUTPUT-----------------")
        //console.log(result[0].dataValues.profile_picture)
  //      console.log("-----------------------PICTURE OUTPUT-----------------")
        var base64img = new Buffer(result[0].dataValues.profile_picture).toString('base64');
        //console.log(base64img);
        res.contentType('image/png');
        res.status(200).send(base64img);
    }).catch((err) => {
        res.status(400).send();
    });

});

router.get('/profileGetObjective/:id', (req, res) => {
 //   console.log("-------------------------------REQ OBJECT-----------------------------")
  //  console.log(req.body);
 //   console.log("-------------------------END REQ OBJECT-----------------------------")
    Student.findAll(
        {
            where : {student_id : req.params.id}
        }
    ).then((result) => {
  //      console.log("-----------------------PICTURE OUTPUT-----------------")
  //      console.log(result[0].dataValues.career_objectives)
  //      console.log("-----------------------PICTURE OUTPUT-----------------")
        res.status(200).send(result[0].dataValues.career_objectives);
    }).catch((err) => {
        res.status(400).send();
    });

});


router.get('/profileGetStudentAddress/:id', (req, res) => {
 //   console.log("-------------------------------REQ OBJECT-----------------------------")
 //   console.log(req.body);
 //   console.log("-------------------------END REQ OBJECT-----------------------------")
    StudentAddress.findAll(
        // {
        //     attributes: ['profile_picture']
        // },
        {
            where : {student_id : req.params.id}
        }
    ).then((result) => {
   //     console.log("-----------------------PICTURE OUTPUT-----------------")
    //    console.log(result[0])
    //    console.log("-----------------------PICTURE OUTPUT-----------------")
        res.status(200).send(result[0]);
    }).catch((err) => {
        res.status(400).send();
    });

});


router.get('/profileGetSkillSet/:id', (req, res) => {
  //  console.log("-------------------------------REQ OBJECT-----------------------------")
 //   console.log(req.body);
 //   console.log("-------------------------END REQ OBJECT-----------------------------")
    Student.findAll(
        // {
        //     attributes: ['profile_picture']
        // },
        {
            where : {student_id : req.params.id}
        }
    ).then((result) => {
  //      console.log("-----------------------PICTURE OUTPUT-----------------")
 //       console.log(result[0].dataValues.skillset)
  //      console.log("-----------------------PICTURE OUTPUT-----------------")
        res.status(200).send(result[0].dataValues.skillset);
    }).catch((err) => {
        res.status(400).send();
    });

});

router.get('/getContactInfo/:id', (req, res) => {
    console.log("-------------------------------REQ OBJECT-----------------------------")
    console.log(req.body);
    console.log("-------------------------END REQ OBJECT-----------------------------")
    Student.findAll(
        {
            where : {student_id : req.params.id}
        }
    ).then((result) => {
        console.log("-----------------------PICTURE OUTPUT-----------------")
        console.log("____________CONATACT__________________")
        console.log(result[0])
        console.log("-----------------------PICTURE OUTPUT-----------------")
        res.status(200).send(result[0]);
    }).catch((err) => {
        res.status(400).send();
    });

});

router.put('/profileUpdateCity/:id', (req, res) => {
    console.log("-------------------------------REQ OBJECT-----------------------------")
    console.log(req.body.city);
    console.log("-------------------------END REQ OBJECT-----------------------------")
    StudentAddress.update(
        {
            city: req.body.city
        },
        {
            where: {student_id : req.params.id}
        }
    ).then((result) => {
        console.log(result)   
    }).catch((err) => {
        console.log(err)
    });
});

router.put('/profileUpdateState/:id', (req, res) => {
    console.log("-------------------------------REQ OBJECT-----------------------------")
    console.log(req.body.state);
    console.log("-------------------------END REQ OBJECT-----------------------------")
    StudentAddress.update(
        {
            state: req.body.state
        },
        {
            where: {student_id : req.params.id}
        }
    ).then((result) => {
        console.log(result)   
    }).catch((err) => {
        console.log(err)
    });
});

router.put('/profileUpdateCountry/:id', (req, res) => {
    console.log("-------------------------------REQ OBJECT-----------------------------")
    console.log(req.body.country);
    console.log("-------------------------END REQ OBJECT-----------------------------")
    StudentAddress.update(
        {
            country: req.body.country
        },
        {
            where: {student_id : req.params.id}
        }
    ).then((result) => {
        console.log(result)   
    }).catch((err) => {
        console.log(err)
    });
});

router.post('/postKafka',(req, res) => {  
    console.log("INSIDE NODE post kafa POST")
    console.log(JSON.stringify(req.body));

    kafka.make_request('getMessageRequest','getMessageResponse',req.body, function(err,results){
        console.log('in result santhosh');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.status(200).send(results);
            }
        
    });

    
});

router.put('/updateKafka',(req, res) => {  
    console.log("INSIDE NODE update kafa Put")
    console.log(JSON.stringify(req.body));

    kafka.make_request('postStudentProfileExperienceRequest', 'postStudentProfileExperienceResponse' ,req.body, function(err,results){
        console.log('in result santhosh');
        console.log(JSON.stringify(results.experience));
        if (err){
            console.log("I mnnside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.status(200).send(results.experience);
            }
        
    });

    
});


router.post('/getStudentProfile',(req, res) => {  
    console.log("BackEnd:Kafka::inside getStudentProfile")
    //let data = {"email":req.params.email};
    console.log(JSON.stringify(req.body));

    kafka.make_request('getStudentProfileRequest','getStudentProfileResponse',req.body, function(err,results){
        console.log('getStudentProfile result:: after call back');
        //console.log(results);
        if (err){
            console.log("I mnnside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("getStudentProfile:: sending result");
                res.status(200).send(results);
            }
        
    });

    
});


router.put('/profileUpdateObjective', (req, res) => {
    console.log("BackEnd:Kafka:profileUpdateObjective")
    //let data = {"email":req.params.email};
    console.log(JSON.stringify(req.body.objective));

    kafka.make_request('updateStudentProfileObjectiveRequest','updateStudentProfileObjectiveResponse',req.body.objective, function(err,results){
        console.log('BackEnd:Kafka::Result::profileUpdateObjective after call back');
        console.log(results);
        console.log("----------------------------");
        if (err){
            console.log("I am inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("profileUpdateObjective:: Send Response");
                res.status(200).send(results);
            }
        
    });
});



router.put('/profileUpdateSkillSet', (req, res) => {
    console.log("BackEnd:Kafka:profileUpdateSkillSet")
    //let data = {"email":req.params.email};
    console.log(JSON.stringify(req.body.skillSet));

    kafka.make_request('updateStudentProfileSkillSetRequest','updateStudentProfileSkillSetResponse',req.body.skillSet, function(err,results){
        console.log('BackEnd:Kafka::Result::profileUpdateSkillSet after call back');
        //console.log(results);
        console.log("----------------------------");
        if (err){
            console.log("I am inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("profileUpdateSkillSet:: Send Response");
                res.status(200).send(results);
            }
        
    });
});


router.put('/profileUpdateCity', (req, res) => {
    console.log("BackEnd:Kafka:profileUpdateCity")
    //let data = {"email":req.params.email};
    console.log(JSON.stringify(req.body.skillSet));

    kafka.make_request('updateStudentProfileCityRequest','updateStudentProfileCityResponse',req.body.address, function(err,results){
        console.log('BackEnd:Kafka::Result::profileUpdateCity after call back');
        //console.log(results);
        console.log("----------------------------");
        if (err){
            console.log("I am inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("profileUpdateCity:: Send Response");
                res.status(200).send(results);
            }
        
    });
});



module.exports = router;