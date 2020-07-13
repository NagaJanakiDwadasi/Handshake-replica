var crypto = require('crypto');
var conn = require('./Connection');

var TIMEOUT=80000; //time to wait for response in ms
var self;

exports = module.exports =  KafkaRPC;

function KafkaRPC(){
    self = this;
    this.connection = conn;
    this.requests = {}; //hash to store request in wait for response
    this.response_queue = false; //placeholder for the future queue
    this.producer = this.connection.getProducer();
}

KafkaRPC.prototype.makeRequest = function(request_topic_name, response_topic_name,content, callback){
    console.log("BackEnd::KafkaRpc:: inside makerequest");
    self = this;
    //generate a unique correlation id for this call
    var correlationId = crypto.randomBytes(16).toString('hex');
    console.log("Step 1");
    //create a timeout for what should happen if we don't get a response
    var tId = setTimeout(function(corr_id){
        //if this ever gets called we didn't get a response in a
        //timely fashion
        console.log('timeout');
        callback(new Error("timeout " + corr_id));
        //delete the entry from hash
        delete self.requests[corr_id];
    }, TIMEOUT, correlationId);
    console.log("Step 2");
    //create a request entry to store in a hash
    var entry = {
        callback:callback,
        timeout: tId //the id for the timeout so we can clear it
    };

    //put the entry in the hash so we can match the response later
    self.requests[correlationId]=entry;
    console.log("Step 3");
    //make sure we have a response topic
    self.setupResponseQueue(self.producer,response_topic_name,function(){
        console.log('BackEnd::Kakfarpc::after execution of  setupResponseQueue');
        //put the request on a topic
        console.log('content::'+JSON.stringify(content));
        var payloads = [
            { topic: request_topic_name, messages: JSON.stringify({
                correlationId:correlationId,
                replyTo: response_topic_name,
                data:content}),
                partition:0}
        ];
        console.log("Step 4");
        //console.log('in response1');
        //console.log(self.producer.ready);
        self.producer.send(payloads, function(err, data){
            console.log('BackEnd::Kafkarpc::inside producer send');
            if(err)
                console.log(err);
            //console.log(data);
        });
    });
};


KafkaRPC.prototype.setupResponseQueue = function(producer,response_topic_name, next){
    //don't mess around if we have a queue
    //if(this.response_queue) return next();

    console.log('BackEnd:Kafkarpc::setupResponseQueue for: ', response_topic_name);

    self = this;

    //subscribe to messages
    var consumer = self.connection.getConsumer(response_topic_name);
    consumer.on('message', function (message) {
        console.log('BackEnd::Kafkarpc:: kafka response :: msg received on '+response_topic_name);
        var data = JSON.parse(message.value);
        //console.log(message.value);
        //console.log("-------------------");
        //get the correlationId
        var correlationId = data.correlationId;
        //is it a response to a pending request
        if(correlationId in self.requests){
            //retrieve the request entry
            var entry = self.requests[correlationId];
            //make sure we don't timeout by clearing it
            clearTimeout(entry.timeout);
            //delete the entry from hash
            delete self.requests[correlationId];
            //callback, no err
            console.log("backend:kafkarpc::before call back")
            entry.callback(null, data.data);
        }
    });
    self.response_queue = true;
    console.log('returning next');
    return next();
};