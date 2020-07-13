const { prepareInternalServerError, prepareSuccess } = require('./responses')
const Message  = require('./../models/MessagesModel');

async function handle_request(req, callback) {
    let resp = {}
    try {
        let searchingCriteria = {
            "$or": [
                {
                    "user1.id": req.user1.id
                },
                {
                    "user2.id": req.user1.id
                }
            ]
}
console.log('searchingCriteria::'+JSON.stringify(searchingCriteria));
        let conversation = await Message.find(searchingCriteria);
        console.log("conversation::"+conversation);
        resp = prepareSuccess({"messages" : conversation});
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

createSearchCriteriaForMessage = (req) => {
    let searchingCriteria = {
                "$or": [
                    {
                        "user1.id": req.user1.id
                    },
                    {
                        "user2.id": req.user1.id
                    }
                ]
    }
    console.log('searchingCriteria::'+searchingCriteria);
    return searchingCriteria;
}

exports.handle_request = handle_request;