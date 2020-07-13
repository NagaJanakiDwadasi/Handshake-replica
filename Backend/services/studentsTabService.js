var express = require('express');
var router = express.Router();
var kafka = require('./../kafka/client');

const Student = require('../models/student');
const Event = require('../models/event');
const EventRegistrations = require('../models/eventRegistrations');

router.get('/getAllStudents', (req, res) => {
    console.log("-------------------------------REQ OBJECT-----------------------------")
    console.log(req.body);
    console.log("-------------------------END REQ OBJECT-----------------------------")
    Student.findAll(
    ).then((studentRecords) => {
        console.log(studentRecords)
        res.status(200).send(studentRecords);
    }).catch((err) => {
        res.status(400).send();
    });

});

router.get('/getAllStudentsKafka', (req, res) => {
  console.log("INSIDE  getAllStudents kafa ")
  
  kafka.make_request('getAllStudentsRequest','getAllStudentsResponse',req.body, function(err,results){
      console.log('in result getAllStudents');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.status(200).send(results.students);
          }
      
  });

});

router.get('/getAllEvents',(req, res) => {  
    Event.findAll({
      order: [
        ['event_date', 'ASC']
      ]  
    }).then(events => {
        console.log(events);
        res.status(200).send(events);
      }).catch((err) => {
        res.status(400).send(); 
      });
});

router.get('/getEventDetails/:id',(req, res) => {  
  Event.findAll({
       where : {event_id : req.params.id}
    }).then(events => {
      console.log(events[0]);
      res.status(200).send(events[0]);
    }).catch((err) => {
      res.status(400).send(); 
    });
});

router.post('/registerEvent/',(req,res) => {
  console.log(req.body.student_id);
  EventRegistrations.findAll( {
    where : 
    {
      student_id : req.body.student_id,
      event_id : req.body.event_id
    }
  }).then((result) => {
    console.log(result) 
    if(result.length === 0){
      EventRegistrations.create(
        {
          event_id : req.body.event_id,
          company_id : req.body.company_id,
          student_id : req.body.student_id
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



router.get('/getRegisteredEvents/:id',(req, res) => {  
  EventRegistrations.findAll(
    {include : [{
      model:Event
    }],
      where : {student_id : req.params.id}
   }
    ).then(events => {
      console.log(events);
      const resObj = events.map(event => {

        //tidy up the user data
        return Object.assign(
          {},
          {
            event_name: event.event.event_name,
            event_location : event.event.event_location
            
          }
        )
      });
      console.log("inside respnse:"+JSON.stringify(resObj));
      res.status(200).send(resObj);
    }).catch((err) => {
      res.status(400).send(); 
    });
});


module.exports = router;