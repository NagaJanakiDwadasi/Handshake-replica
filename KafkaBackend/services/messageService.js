const { prepareInternalServerError, prepareSuccess } = require('./responses')
const Message  = require('./../models/MessagesModel');

async function handle_request(req, callback) {
    let resp = {}
    try {
        console.log("req.user1.id::"+req.user1.id);
        console.log("req.user2.id::"+req.user2.id);
        let searchingCriteria = {
            "$or": [
                {
                    "user1.id": req.user1.id,
                    "user2.id": req.user2.id  
                },
                {
                    "user1.id": req.user2.id,
                    "user2.id": req.user1.id  
                }
            ]
  
        }
        console.log("searchingCriteria::"+JSON.stringify(searchingCriteria));
        let conversation = await Message.findOne(searchingCriteria);
        console.log("conversation::"+conversation);
        let storedConversation = null;
        if (conversation) {
            storedConversation = await Message.findOneAndUpdate(searchingCriteria, {
                $push: {
                    messages: req.messages
                }
            });
        } else {
            conversation = {
                user1: req.user1 ,
                user2: req.user2 ,
                messages: req.messages
            }
            storedConversation = await Message.create(conversation);
        }
        
        searchingCriteria = {
            "$or": [
                {
                    "user1.id": req.user1.id
                },
                {
                    "user2.id": req.user1.id
                }
            ]
}
console.log("searchingCriteria::"+JSON.stringify(searchingCriteria));
        conversation = await Message.find(searchingCriteria);
        console.log("conversation::"+conversation);
        resp = prepareSuccess({"messages" : conversation} );
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

createSearchCriteriaForMessage = (req) => {
    
    let searchingCriteria = {
                "user1.id": req.user1.id,
                "user2.id": req.user2.id
    }
    console.log("req.user1.id::"+req.user1.id);
    console.log("req.user2.id::"+req.user2.id);
    console.log('searchingCriteria::'+JSON.stringify(searchingCriteria));
    return searchingCriteria;
}

exports.handle_request = handle_request;