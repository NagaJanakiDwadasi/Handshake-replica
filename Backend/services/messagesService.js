var express = require('express');
var router = express.Router();
var kafka = require('./../kafka/client');

router.post('/postMessages',(req, res) => {  
    console.log("INSIDE NODE post kafa POST")
    console.log(JSON.stringify(req.body));

    kafka.make_request('messageRequest','messageResponse',req.body, function(err,results){
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
                res.status(200).send(results.messages);
            }
        
    });

    
});

module.exports = router;