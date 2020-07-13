var rpc = new (require('./kafkarpc'))();

//make request to kafka
function make_request(queue_name, response_queue_name,msg_payload, callback){
    console.log('BackEnd::Client::in make request::request_queue_name::'+ queue_name +"--response::"+response_queue_name);
	//console.log(msg_payload);
	console.log("---------------------");
	rpc.makeRequest(queue_name, response_queue_name, msg_payload, function(err, response){

		if(err)
			console.error(err);
		else{
			//console.log("response", response);
			callback(null, response);
		}
	});
}

exports.make_request = make_request;